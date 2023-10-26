import type { Configuration } from "webpack";

import { rules } from "./webpack.rules";
import { plugins } from "./webpack.plugins";

rules.push(
  {
    test: /\.css$/,
    use: [
      { loader: "style-loader" },
      { loader: "css-loader" },
      { loader: "postcss-loader" },
    ],
  },
  {
    test: /\.(jpe?g|png|gif|eot|svg)(\?[a-z0-9=.]+)?$/,
    use: [
      {
        loader: "url-loader",
        options: {
          limit: 250000,
        },
      },
    ],
  }
  // {
  //   test: /\.(woff|woff2|eot|ttf)$/,
  //   use: { loader: "url-loader" },
  // }
);

export const rendererConfig: Configuration = {
  module: {
    rules,
  },
  plugins,
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css"],
  },
};
