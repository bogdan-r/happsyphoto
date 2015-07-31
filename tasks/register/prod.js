module.exports = function (grunt) {
	grunt.registerTask('prod', [
		'compileAssets',
		'concat',
		'uglify',
		'cssmin',
		'sails-linker:prodJs',
		'sails-linker:prodAdminJs',
		'sails-linker:prodStyles',
		'sails-linker:prodAdminStyles',
		'sails-linker:devTpl',
		'sails-linker:devAdminTpl',
		'sails-linker:prodJsJade',
		'sails-linker:prodStylesJade',
		'sails-linker:devTplJade'
	]);
};
