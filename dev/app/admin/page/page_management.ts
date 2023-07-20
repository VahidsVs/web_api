import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
    getLanguage,
    getTranslate,
    getDirectionFromLanguage,
    GetData,
    PostData,
    PostDataForm,
    AjaxSuccessFunction
} from '../../cms_general';
import * as ko from 'knockout';

@customElement('cms-pagemanagement')
class CmsPageManagement extends LitElement {
    createRenderRoot() {
        return this;
    }

    //    static get styles() {
    //        return css`
    //`;
    //    }

    private lcid;

    private Model = {
        data: {
            pk: ko.observable(),
            pk_page: ko.observable(),
            title: ko.observable(),
            slug: ko.observable(),
            content: ko.observable(),
            meta_keyword: ko.observable(),
            meta_description: ko.observable(),
        },
        translate: {
            menu_page_management: ko.observable(),
            tab_title_list: ko.observable(),
            tab_title_details: ko.observable(),
            btn_submit: ko.observable(),
            btn_new: ko.observable(),
            btn_cancel: ko.observable(),
            label_title: ko.observable(),
            label_slug: ko.observable(),
            label_content: ko.observable(),
            label_meta_keyword: ko.observable(),
            label_meta_description: ko.observable(),
        },
        errors: {
            title: ko.observable(),
            slug: ko.observable(),
            content: ko.observable(),
            meta_keyword: ko.observable(),
            meta_description: ko.observable(),
        },
        setErrors: function (errors: any) {
            this.errors.title(errors ? getTranslate(errors.title) : undefined);
            this.errors.slug(errors ? getTranslate(errors.slug) : undefined);
            this.errors.content(errors ? getTranslate(errors.content) : undefined);
            this.errors.meta_keyword(errors ? getTranslate(errors.meta_keyword) : undefined);
            this.errors.meta_description(errors ? getTranslate(errors.meta_description) : undefined);
        }
    };

    ClearScr() {

        this.Model.data.pk("");
        this.Model.data.pk_page("");
        this.Model.data.title("");
        this.Model.data.slug("");
        this.Model.data.content("");
        this.Model.data.meta_keyword("");
        this.Model.data.meta_description("");
        
        this.Model.errors.title("");
        this.Model.errors.slug("");
        this.Model.errors.content("");
        this.Model.errors.meta_keyword("");
        this.Model.errors.meta_description("");
        
        $("#editor").data("kendoEditor").value(null);

        //@ts-ignore
        $("#myTab button").eq(0).show().tab('show');
        $("#myTab button").eq(1).hide();
    }

    constructor() {
        super();

        this.lcid = getLanguage();

        document.title = getTranslate('menu_page_management');

        this.Model.translate.menu_page_management(getTranslate('menu_page_management'));
        this.Model.translate.tab_title_list(getTranslate('tab_title_list'));
        this.Model.translate.tab_title_details(getTranslate('tab_title_details'));
        this.Model.translate.btn_submit(getTranslate('btn_submit'));
        this.Model.translate.btn_new(getTranslate('btn_new'));
        this.Model.translate.btn_cancel(getTranslate('btn_cancel'));
        this.Model.translate.label_title(getTranslate('label_title'));
        this.Model.translate.label_slug(getTranslate('label_slug'));
        this.Model.translate.label_content(getTranslate('label_content'));
        this.Model.translate.label_meta_keyword(getTranslate('label_meta_keyword'));
        this.Model.translate.label_meta_description(getTranslate('label_meta_description'));
    }

    firstUpdated(changedProperties: any) {


        ko.applyBindings(this.Model, document.getElementById("pnlContent"));

        $(() => {

        })

        this.FillDataGrid();
        this.InitEditor();
    }

    InitEditor() {
        $("#editor").kendoEditor({
            resizable: {
                content: true,
                toolbar: true
            }
        });
    }

    FillDataGrid() {

        let kendoWidget = $("#grid").data("kendoGrid");
        if (kendoWidget) {
            // kendoGrid.destroy();
            // $("#grid").empty();
            kendoWidget.dataSource.read();
            kendoWidget.refresh();
            return;
        }

        if (getDirectionFromLanguage(this.lcid) == "rtl") {
            $("#grid").addClass("k-rtl");
        } else {
            $("#grid").addClass("k-ltr");
        }

        let dataSource = new kendo.data.DataSource({
            transport: {
                read: (e) => {
                    GetData("post/select_post_admin.php", null, "#tab1-pane")
                        .then(data => {
                            e.success(data);
                        })
                },
            },
            pageSize: 10,
        });

        let record = 0;

        let grid = $("#grid").kendoGrid({
            // toolbar: ["excel"],
            excel: {
                fileName: "ExcelExport.xlsx",
                allPages: true,
                filterable: true,
            },
            excelExport: function (e: any) {
                var workbook: any = e.workbook;
                var sheet = workbook.sheets[0];

                workbook.rtl = true;
                for (var i = 0; i < sheet.rows.length; i++) {
                    for (var ci = 0; ci < sheet.rows[i].cells.length; ci++) {
                        if (sheet.rows[i].type === "header") {
                            sheet.rows[i].cells[ci].background = "#61cbe9";
                        }
                        sheet.rows[i].cells[ci].hAlign = "right";
                    }
                }
            },
            dataSource: dataSource,
            sortable: true,
            resizable: true,
            scrollable: true,
            dataBound: (e: any) => {

            },
            filterable: {
                extra: false,
            },
            pageable: {
                pageSizes: [10, 50, 100, 200],
            },
            dataBinding: function () {
                record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
            },
            groupable: false,
            columns: [
                { selectable: true, width: "50px", hidden: true },
                {
                    title: "#",
                    groupable: false,
                    template: () => {
                        return ++record
                    },
                    width: 50,
                },
                {
                    title: getTranslate('btn_edit'),
                    width: 100,
                    command: {
                        name: "Edit",
                        template: "<a class='btn btn-secondary k-grid-Edit'><span class='fa fa-pencil-square'></span></a>",
                        click: async (e: any) => {
                            e.preventDefault();

                            let row = $(e.currentTarget).closest("tr")[0];
                            var dataItem: any = $("#grid").data("kendoGrid").dataItem(row);

                            this.ClearScr();

                            //@ts-ignore
                            $("#myTab button").eq(1).show().tab('show');

                            this.Model.data.pk(dataItem.pk_post);
                            this.Model.data.pk_page(dataItem.pk_page);
                            this.Model.data.title(dataItem.title);
                            this.Model.data.slug(dataItem.slug);
                            this.Model.data.content(dataItem.content);
                            this.Model.data.meta_keyword(dataItem.meta_keyword);
                            this.Model.data.meta_description(dataItem.meta_description);

                            $("#editor").data("kendoEditor").value(dataItem.content);
                        }
                    }
                },
                {
                    title: getTranslate('btn_delete'),
                    width: 100,
                    command: {
                        name: "Delete",
                        template: "<a class='btn btn-danger k-grid-Delete'><span class='fa fa-close'></span></a>",
                        click: (e: any) => {
                            e.preventDefault();

                            let row = $(e.currentTarget).closest("tr")[0];
                            var dataItem: any = $("#grid").data("kendoGrid").dataItem(row);

                            //@ts-ignore
                            $("<div></div>").confirm({
                                okText: getTranslate('label_yes'),
                                cancelText: getTranslate('label_no'),
                                title: getTranslate('btn_delete'),
                                content: getTranslate('msg_are_you_sure'),
                                okCallback: () => {
                                    GetData("post/delete_post_admin.php", { pk: dataItem.pk_page }, "#grid")
                                        .then(data => {
                                            if (data.message === undefined) {
                                                AjaxSuccessFunction(data.msg, 3000);

                                                this.FillDataGrid();
                                            }
                                        });
                                }
                            }).data("confirm").show();
                        }
                    }
                },
                {
                    field: "title",
                    title: getTranslate('label_title'),
                    width: 150,
                    groupable: false,
                    headerAttributes: { style: "white-space: normal" },
                    filterable: {
                        operators: {
                            string: {
                                contains: getTranslate("label_contains"),
                                doesnotcontain: getTranslate("label_doesnotcontain"),
                                eq: getTranslate("label_equal"),
                                neq: getTranslate("label_notequal"),
                            }
                        }
                    },
                },
                {
                    field: "slug",
                    title: getTranslate('label_slug'),
                    width: 150,
                    groupable: false,
                    headerAttributes: { style: "white-space: normal" },
                    filterable: {
                        operators: {
                            string: {
                                contains: getTranslate("label_contains"),
                                doesnotcontain: getTranslate("label_doesnotcontain"),
                                eq: getTranslate("label_equal"),
                                neq: getTranslate("label_notequal"),
                            }
                        }
                    },
                },
                {
                    field: "created_at",
                    title: getTranslate('label_created_at'),
                    width: 150,
                    groupable: false,
                    headerAttributes: { style: "white-space: normal" },
                    filterable: {
                        operators: {
                            string: {
                                contains: getTranslate("label_contains"),
                                doesnotcontain: getTranslate("label_doesnotcontain"),
                                eq: getTranslate("label_equal"),
                                neq: getTranslate("label_notequal"),
                            }
                        }
                    },
                },
                {
                    field: "updated_at",
                    title: getTranslate('label_updated_at'),
                    width: 150,
                    groupable: false,
                    headerAttributes: { style: "white-space: normal" },
                    filterable: {
                        operators: {
                            string: {
                                contains: getTranslate("label_contains"),
                                doesnotcontain: getTranslate("label_doesnotcontain"),
                                eq: getTranslate("label_equal"),
                                neq: getTranslate("label_notequal"),
                            }
                        }
                    },
                },
                {
                    field: "username",
                    title: getTranslate('label_username'),
                    width: 150,
                    groupable: false,
                    headerAttributes: { style: "white-space: normal" },
                    filterable: {
                        operators: {
                            string: {
                                contains: getTranslate("label_contains"),
                                doesnotcontain: getTranslate("label_doesnotcontain"),
                                eq: getTranslate("label_equal"),
                                neq: getTranslate("label_notequal"),
                            }
                        }
                    },
                },
            ]
        });
    }

    btnNew_Click() {
        this.ClearScr();

        //@ts-ignore
        $("#myTab button").eq(1).show().tab('show');
        $("#myTab button").eq(2).hide()
        $("#myTab button").eq(3).hide()
    }

    Submit_Click() {

        if (this.Model.data.pk_page() == null || this.Model.data.pk_page() == "") {
            PostDataForm("post/insert_post_admin.php", ko.toJS(this.Model.data), "#tab2-pane")
                .then(data => {
                    if (data.errors === undefined && data.message === undefined) {
                        this.ClearScr();
                        AjaxSuccessFunction(data.msg, 3000);
                        this.FillDataGrid();
                    }
                    this.Model.setErrors(data.errors);
                })
        }
        else {
            PostDataForm("post/update_post_admin.php", ko.toJS(this.Model.data), "#tab2-pane")
                .then(data => {
                    if (data.errors === undefined && data.message === undefined) {
                        this.ClearScr();
                        AjaxSuccessFunction(data.msg, 3000);
                        this.FillDataGrid();
                    }
                    this.Model.setErrors(data.errors);
                })
        }
    }

    Cancel_Click() {
        this.ClearScr();
    }

    render() {
        return html`
<div class="container-fluid" id="pnlContent">
    <div class="fade-in">
        <h3><span data-bind="text: translate.menu_page_management"></span></h3>
    </div>
    <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
            <button class="nav-link active" data-bs-target="#tab1-pane" data-bs-toggle="tab">
                <span data-bind="text: translate.tab_title_list"></span>
            </button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" style="display: none;" data-bs-target="#tab2-pane" data-bs-toggle="tab">
                <span data-bind="text: translate.tab_title_details"></span>
            </button>
        </li>
    </ul>
    <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="tab1-pane">
            <div class="container-fluid p-2">
                <div class="row">
                    <div class="col-md-12 p-2">
                        <button class="btn btn-primary" @click="${this.btnNew_Click}"><span class="fa fa-plus"></span> <span data-bind="text: translate.btn_new"></span></button>
                    </div>
                </div>
                <div id="grid"></div>
            </div>
        </div>
        <div class="tab-pane fade" id="tab2-pane">
            <div class="container-fluid p-2">
                <div class="row p-2">
                    <div class="col-md-6 p-2">
                        <div class="form-group">
                            <label data-bind="text: translate.label_title" class="form-label"></label> <span class="invalid">*</span>
                            <input type="text" class="form-control" data-bind="value: data.title">
                            <span class="invalid" data-bind="text: errors.title"></span>
                        </div>
                    </div>
                    <div class="col-md-6 p-2">
                        <div class="form-group">
                            <label data-bind="text: translate.label_slug" class="form-label"></label> <span class="invalid">*</span>
                            <input type="text" class="form-control" data-bind="value: data.slug">
                            <span class="invalid" data-bind="text: errors.slug"></span>
                        </div>
                    </div>
                    <div class="col-md-6 p-2">
                        <div class="form-group">
                            <label data-bind="text: translate.label_meta_keyword" class="form-label"></label>
                            <input type="text" class="form-control" data-bind="value: data.meta_keyword">
                            <span class="invalid" data-bind="text: errors.meta_keyword"></span>
                        </div>
                    </div>
                    <div class="col-md-6 p-2">
                        <div class="form-group">
                            <label data-bind="text: translate.label_meta_description" class="form-label"></label>
                            <input type="text" class="form-control" data-bind="value: data.meta_description">
                            <span class="invalid" data-bind="text: errors.meta_description"></span>
                        </div>
                    </div>
                    <div class="col-md-12 p-2">
                        <div class="form-group">
                            <label data-bind="text: translate.label_content" class="form-label"></label> <span class="invalid">*</span>
                            <textarea id="editor" class="form-control" rows="10" cols="30" style="width:100%; height:450px" data-bind="value: data.content"></textarea>
                            <span class="invalid" data-bind="text: errors.content"></span>
                        </div>
                    </div>
                </div>
                <div class="row p-2">
                    <div class="col-md-6">
                        <div class="form-group">
                            <button @click="${this.Submit_Click}" class="btn btn-success"><span class="fa fa-save"></span> <span data-bind="text: translate.btn_submit"></span></button>
                            <button @click="${this.Cancel_Click}" class="btn btn-danger"><span class="fa fa-close"></span> <span data-bind="text: translate.btn_cancel"></span></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    
</div>
        `;
    }
}