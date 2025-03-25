export const fontFamilies = {
    primary: {
      regular: 'Inter-Regular',
      medium: 'Inter-Medium',
      semiBold: 'Inter-SemiBold',
      bold: 'Inter-Bold',
    },
    secondary: {
      regular: 'Roboto-Regular',
      medium: 'Roboto-Medium',
      bold: 'Roboto-Bold',
    },
  };

  export const fontSizes = {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  };

  export const fontWeights = {
    regular: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
  };

  export const typography = {
    h1: {
      fontFamily: fontFamilies.primary.bold,
      fontSize: fontSizes.xxxl,
      fontWeight: fontWeights.bold,
    },
    h2: {
      fontFamily: fontFamilies.primary.bold,
      fontSize: fontSizes.xxl,
      fontWeight: fontWeights.bold,
    },
    h3: {
      fontFamily: fontFamilies.primary.semiBold,
      fontSize: fontSizes.xl,
      fontWeight: fontWeights.semiBold,
    },
    body1: {
      fontFamily: fontFamilies.primary.regular,
      fontSize: fontSizes.md,
      fontWeight: fontWeights.regular,
    },
    body2: {
      fontFamily: fontFamilies.primary.regular,
      fontSize: fontSizes.sm,
      fontWeight: fontWeights.regular,
    },
    caption: {
      fontFamily: fontFamilies.primary.regular,
      fontSize: fontSizes.xs,
      fontWeight: fontWeights.regular,
    },
    button: {
      fontFamily: fontFamilies.primary.medium,
      fontSize: fontSizes.md,
      fontWeight: fontWeights.medium,
    },
  };

  // Export thêm đối tượng FONTS tổng hợp
  export const FONTS = {
    ...typography,
    sizes: fontSizes,
    weights: fontWeights,
    families: fontFamilies,
    medium: fontFamilies.primary.medium,
  };
