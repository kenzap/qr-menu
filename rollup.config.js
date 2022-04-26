// Find plugins: https://github.com/rollup/awesome
import glob from "glob"
import path from "path"
import { terser } from "rollup-plugin-terser"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import babel from "@rollup/plugin-babel"
import commonjs from "@rollup/plugin-commonjs"
import copy from 'rollup-plugin-copy'
import fs from 'fs';
import replaceHtmlVars from 'rollup-plugin-replace-html-vars';
import livereload from 'rollup-plugin-livereload'

// get build mode
const prodEnv = process.env.BABEL_ENV === "production"
const targetFolder = "public/"
const srcFolder = "src/"
const absolutePath = (dirPath) => path.resolve(__dirname, dirPath)

/**
 * This is a simple build pipeline for JavaScript files.
 *
 * It works by checking for any `.js` files without a leading `_`
 * in the name. If so, rollup processes the file using
 * the defined babel configuration and spits it out (folder
 * paths in tact) in the project's dist folder.
 *
 * It's intended to be simple and get out of the way as much
 * as possible. Unlike other front-end pipelines, this one
 * does not associate file names to any particular layout
 * or view. Developers have full control over which files
 * get loaded by requiring them to add a script tag.
 *
 * Additionally, the npm scripts are set up to process
 * scripts using terser for additional optimization when
 * the build is in "production" mode (see `netlify.tml`
 * and `package.json`).
 */

const terserPlugin = terser({
	output: {
		comments: (_, comment) => {
			const { value, type } = comment
			if (type === "comment2") {
				return /@preserve|@license|@cc_on/i.test(value)
			}
		},
	},
})

let workingFolders = [];

/* prepare script import paths */
let scriptFiles = glob.sync(absolutePath("src/!(_)*/!(_)*.js"))
const scriptInputs = scriptFiles.reduce((files, input) => {
	const parts = input.split("src/")
	const fileKey = parts[parts.length - 1]
	return { [fileKey]: absolutePath(input), ...files }
}, {})

const scriptPaths = Object.keys(scriptInputs)
const scriptOutputs = scriptPaths.reduce((files, file) => {
	const inputPath = scriptInputs[file]
	const parts = inputPath.split("/")
	const pathIndex = parts.indexOf("index.js") - 1

	const outputPath = parts.slice(pathIndex).join("/")

	workingFolders.push(parts[parts.length-2]);
	return { [file]: absolutePath(targetFolder + outputPath), ...files }
	
}, {})

/**
 * Do localizations here. Get through every .js file and find i18n occurances, ex.: __()
 * extract all texts and save under public/locales/default.json file.
 * 
 * Prepare scripts for localization. Automatically run in production mode only
 */

if(prodEnv){
	
	// set locales folder
	if (!fs.existsSync( targetFolder + 'locales/' )){ fs.mkdirSync( targetFolder + 'locales/' ); }
	fs.writeFileSync( targetFolder + 'locales/default.json', '{ "language": "default", "texts": {} }', { flag:'w' } ); // set defaults

	let scriptFilesAll = glob.sync(absolutePath("src/**/*.js"))
	scriptFilesAll.forEach((input) => { i18n(input); });

	function i18n(key){ // export i18n

		// get current strings
		var def = fs.readFileSync( targetFolder + '/locales/default.json', { encoding:'utf8', flag:'r' });
		var defJS = JSON.parse(def);

		// find strings
		if (fs.existsSync( key )){
			
			var temp = fs.readFileSync( key, {encoding:'utf8', flag:'r'});
			var q1 = new RegExp(/__\('(.*?)'/g);
			var q2 = new RegExp(/__\("(.*?)"/g);
			var result;

			while (result = q1.exec(temp)) { defJS['texts'][result[1]] = result[1]; }
			while (result = q2.exec(temp)) { defJS['texts'][result[1]] = result[1]; }

			// write default locale
			fs.writeFileSync( targetFolder + 'locales/default.json', JSON.stringify(defJS) ); 
		}
	}
}

const bundles = scriptPaths.map((key) => {

	let sourcemap = true

	// plugin list for any build mode
	const plugins = [
		nodeResolve(),
		commonjs(), 
		babel({
			babelHelpers: "bundled",
			exclude: "node_modules/**",
			comments: false,
		}),   
		copy({
			targets: [
				{ src: ['public/home/*'], dest: 'public' }
			],
			// flatten: false
		})
	]

	// plugin list for production mode
	if (prodEnv) {

		plugins.push(terserPlugin)
		plugins.push(
			replaceHtmlVars({
				files: 'public/*/index.html',
				from: /\${timestamp}/g,
				to: new Date().getTime(),
			})
		)
		
		sourcemap = false
	// plugin list development mode
	}else{
		plugins.push(
			livereload({
				watch: [ 
				path.resolve(__dirname, 'public'),
				],
				delay: 500,
				exts: [ 'html', 'js', 'scss', 'sass', 'css' ]
			})
		)
	}

	return {
		input: scriptInputs[key],
		output: {
			file: scriptOutputs[key],
			format: "iife",
			sourcemap,
		},
		plugins,
	}
})

export default bundles
