var path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RemoveEmptyScriptsPlugin = require("webpack-remove-empty-scripts");
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let sitePages = [
    'index',
    'my_home',
    'login',
    'profile',
    'register',
    'contact_us',
    'about_us',
    'impressum',
    'access_denied',
];

let adminPages = [
    'test',

    'index',
    'permission_level_management',
    'contact_us',
    'post',
];

module.exports = {
    context: path.join(__dirname, 'app'),
    entry: sitePages.reduce((config, page) => {
        config[page] = `./site/page/${page}.ts`;
        return config;
    },
        adminPages.reduce((config, page) => {
            config['admin_' + page] = `./admin/page/${page}.ts`;
            return config;
        },
            {
                //<admin>
                admin_template: [
                    './admin/notification.ts',

                    './admin/master/controller.ts',
                    './admin/master/header.ts',
                    './admin/master/footer.ts',
                ],

                admin: [
                    "./admin_mainjs.js",
                ],
                admin_rtl: [
                    "../node_modules/bootstrap/dist/css/bootstrap.rtl.css",
                    "../content/font-awesome.css",
                    "../content/admin_rtl.css",
                    "../node_modules/@majidh1/jalalidatepicker/dist/jalaliDatepicker.min.css",
                    "../node_modules/@progress/kendo-ui/css/web/classic-main.css",
                ],
                admin_ltr: [
                    "../node_modules/bootstrap/dist/css/bootstrap.css",
                    "../content/font-awesome.css",
                    "../content/admin_ltr.css",
                    "../node_modules/@majidh1/jalalidatepicker/dist/jalaliDatepicker.min.css",
                    "../node_modules/@progress/kendo-ui/css/web/classic-main.css",
                ],
                //</admin>

                //<site>
                template: [
                    './admin/notification.ts',

                    './site/master/controller.ts',
                    './site/master/header.ts',
                    './site/master/footer.ts',
                ],
                access_denied_template: [
                    './admin/notification.ts',

                    './site/master/controller.ts',
                ],

                site: [
                    "./site_mainjs.js",
                ],
                // site_rtl: [
                //     "../node_modules/bootstrap/dist/css/bootstrap.rtl.css",
                //     "../content/font-awesome.css",
                //     "../content/site_rtl.css",
                //     "../node_modules/@majidh1/jalalidatepicker/dist/jalaliDatepicker.min.css",
                // ],
                site_ltr: [
                    "../content/bootstrap.min.css",
                    "../content/lib/animate/animate.min.css",
                    "../content/lib/owlcarousel/assets/owl.carousel.min.css",
                    "../content/site.css",
                ],
                //</site>
            })),
    output: {
        path: path.join(__dirname, '../bundle'),
        filename: '[name].bundle.[contenthash].js',
        clean: true,
    },
    plugins: [
        new RemoveEmptyScriptsPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
    ].concat(
        sitePages.map(
            (page) =>
                new HtmlWebpackPlugin({
                    inject: 'body',
                    template: path.join(__dirname, 'app/site_template.ejs'),
                    filename: `../${page}.html`,
                    chunksSortMode: 'manual',
                    chunks: ['site', 'template', `${page}`],
                    templateParameters: {
                        'mainCss': '<link id="mainCss" href="/bundle/site_ltr.css" type="text/css" rel="stylesheet" />',
                        'controller': `<cms-controller ComponentName="cms-${page.replace("_", "")}"></cms-controller>`,
                    }
                }),
        ),
        // <- here goes array(s) of other plugins
    ).concat(
        adminPages.map(
            (page) =>
                new HtmlWebpackPlugin({
                    inject: 'body',
                    template: path.join(__dirname, 'app/admin_template.ejs'),
                    filename: `../admin/${page}.html`,
                    chunksSortMode: 'manual',
                    chunks: ['admin', 'admin_template', `admin_${page}`],
                    templateParameters: {
                        'mainCss': '<link id="mainCss" href="/bundle/admin_ltr.css" type="text/css" rel="stylesheet" />',
                        'controller': `<cms-controller ComponentName="cms-${page.replace("_", "")}"></cms-controller>`,
                    }
                }),
        ),
        // <- here goes array(s) of other plugins
    ),
    optimization: {
        minimizer: [new TerserPlugin({
            extractComments: false,
        })],
    },
    module: {
        rules: [
            {
                test: /\.(html)$/,
                loader: "raw-loader"
            },
            {
                test: /\.ts?$/,
                use: 'ts-loader',
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ]
    },
    resolve: {
        // Add ".ts" and ".tsx" as resolvable extensions.
        extensions: [".ts", ".tsx", ".js"],
    },
};