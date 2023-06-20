var path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RemoveEmptyScriptsPlugin = require("webpack-remove-empty-scripts");

module.exports = {
    context: path.join(__dirname, 'app'),
    entry: {

        //<admin>
        admin_template: [
            './admin/notification.ts',
            
            './admin/master/controller.ts',
            './admin/master/header.ts',
            './admin/master/footer.ts',
        ],

        admin_test: './admin/page/test.ts',

        admin_index: './admin/page/index.ts',
        admin_permission_level_management: './admin/page/permission_level_management.ts',

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
        
        access_denied: './site/page/access_denied.ts',

        index: './site/page/index.ts',
        my_home: './site/page/my_home.ts',
        login: './site/page/login.ts',
        register: './site/page/register.ts',

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
    },
    output: {
        path: path.join(__dirname, '../bundle'),
        filename: '[name].bundle.js',
        clean: true,
    },
    plugins: [
        new RemoveEmptyScriptsPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
    ],
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