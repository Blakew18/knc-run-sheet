import type { Configuration } from "webpack";

import { rules } from "./webpack.rules";
import { plugins } from "./webpack.plugins";

rules.push(
  {
    test: /\.css$/,
    use: [{ loader: "style-loader" }, { loader: "css-loader" }],
  },
  {
    test: /\.(jpe?g|png|gif|eot|svg)(\?[a-z0-9=.]+)?$/,
    use: [
      {
        loader: "file-loader",
      },
    ],
  },
  {
    test: /\.(woff|woff2|eot|ttf)$/,
    use: { loader: "url-loader" },
  }
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
