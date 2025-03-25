module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],  // Thay đổi từ './src' thành '.'
          extensions: [
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
            '.android.js',
            '.android.tsx',
            '.ios.js',
            '.ios.tsx',
            '.json',
          ],
          alias: {
            // Thêm '@' để map tới thư mục src
            '@': './src',
            '@components': './src/components',
            '@screens': './src/screens',
            '@constants': './src/constants',
            '@services': './src/services',
            '@assets': './assets',
            '@types': './src/types',
            // Thêm các alias khác nếu cần
          },
        },
      ],
    ],
  };
};
