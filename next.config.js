const withFonts = require('next-fonts');
const withSvgr = require('next-plugin-svgr');

const nextConfig = {
	future: { webpack5: true },
};

module.exports = withFonts(withSvgr(nextConfig));
