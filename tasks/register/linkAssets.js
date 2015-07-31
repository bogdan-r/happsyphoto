module.exports = function (grunt) {
	grunt.registerTask('linkAssets', [
		'sails-linker:devJs',
		'sails-linker:devAdminJs',
		'sails-linker:devStyles',
		'sails-linker:devAdminStyles',
		'sails-linker:devTpl',
		'sails-linker:devAdminTpl',
		'sails-linker:devJsJade',
		'sails-linker:devStylesJade',
		'sails-linker:devTplJade'
	]);
};
