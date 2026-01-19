import { createApp } from "vue";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import LogRocket from "logrocket";
//test

const app = createApp(App);

const requireComponent = require.context(
	// The relative path of the components folder
	"./components/base",
	// Whether or not to look in subfolders
	false,
	// The regular expression used to match base component filenames
	/Base[A-Z]\w+\.(vue|js)$/
);

requireComponent.keys().forEach((fileName) => {
	// Get component config
	const componentConfig = requireComponent(fileName);

	// Get PascalCase name of component
	const componentName = upperFirst(
		camelCase(
			// Gets the file name regardless of folder depth
			fileName
				.split("/")
				.pop()
				.replace(/\.\w+$/, "")
		)
	);

	app.component(
		componentName,
		// Look for the component options on `.default`, which will
		// exist if the component was exported with `export default`,
		// otherwise fall back to module's root.
		componentConfig.default || componentConfig
	);
});

app.use(store).use(router).mount("#app");

// const isUsingLogRocket = process?.env?.VUE_APP_LOG_ROCKET_ID ? true : false;
// if (isUsingLogRocket)
// 	LogRocket.init(process?.env?.VUE_APP_LOG_ROCKET_ID, {
// 		shouldCaptureIP: false,
// 		release: store?.state?.appVersion,
// 	});
