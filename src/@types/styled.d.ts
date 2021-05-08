// import original module declaration
import 'styled-components';

// and extend it
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      backgroundPrimary: string;
      backgroundSecondary: string;
      backgroundLight: string;
      backgroundDark: string;
      backgroundRedPrimary: string;

      textPrimary: string;
      textSecondary: string;
      textTertiary: string;
      textLight: string;
      textDark: string;
      textRedPrimary: string;
      textWhitePrimary: string;
    };

    fontFamily: {
      poppinsMedium: string;
      poppinsLight: string;
    };

    fontSize: {
      titleBig: number;
      titleNormal: number;
      titleSmall: number;
      subtitleBig: number;
      subtitleNormal: number;
      subtitleSmall: number;
      paragraphBig: number;
      paragraphNormal: number;
      paragraphSmall: number;
      legend: number;
    };
  }
}
