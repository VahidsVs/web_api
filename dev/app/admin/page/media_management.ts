import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
    getLanguage,
    getTranslate,
    getDirectionFromLanguage,
    GetData,
    PostData,
    PostDataForm,
    PostDataFile,
    AjaxSuccessFunction,
    GetDataWithoutLoading
} from '../../cms_general';
import * as ko from 'knockout';

@customElement('cms-mediamanagement')
class CmsMediaManagement extends LitElement {
    createRenderRoot() {
        return this;
    }

    //    static get styles() {
    //        return css`
    //`;
    //    }

    private lcid;

    @state()
    private Desc: any = [];

    private ConfigData: any = [];

    private Model = {
        data: {
            pk_media: ko.observable(),
        },
        translate: {
            menu_media_management: ko.observable(),
            tab_title_list: ko.observable(),
            tab_title_details: ko.observable(),
            btn_submit: ko.observable(),
            btn_new: ko.observable(),
            btn_cancel: ko.observable(),
            label_file: ko.observable(),
            label_description: ko.observable(),
        },
        errors: {
            file: ko.observable(),
            fileUploadSize: ko.observable(),
            fileUploadExtension: ko.observable(),
        },
        setErrors: function (errors: any) {
            this.errors.file(errors ? getTranslate(errors.file) : undefined);
            this.errors.fileUploadSize(errors ? getTranslate(errors.fileUploadSize) : undefined);
            this.errors.fileUploadExtension(errors ? getTranslate(errors.fileUploadExtension) : undefined);
        }
    };

    ClearScr() {

        this.Model.data.pk_media("");

        this.Model.errors.fileUploadSize("");
        this.Model.errors.fileUploadExtension("");

        this.clearFileInput("uploader");

        //@ts-ignore
        $("#myTab button").eq(0).show().tab('show');
        $("#myTab button").eq(1).hide();
    }

    clearFileInput(id: string) {
        var oldInput = document.getElementById(id) as HTMLInputElement;

        var newInput = document.createElement("input");

        newInput.type = "file";
        newInput.id = oldInput.id;
        newInput.name = oldInput.name;
        newInput.className = oldInput.className;
        newInput.style.cssText = oldInput.style.cssText;
        // TODO: copy any other relevant attributes 

        oldInput.parentNode.replaceChild(newInput, oldInput);
    }

    constructor() {
        super();

        this.lcid = getLanguage();

        document.title = getTranslate('menu_media_management');

        this.Model.translate.menu_media_management(getTranslate('menu_media_management'));
        this.Model.translate.tab_title_list(getTranslate('tab_title_list'));
        this.Model.translate.tab_title_details(getTranslate('tab_title_details'));
        this.Model.translate.btn_submit(getTranslate('btn_submit'));
        this.Model.translate.btn_new(getTranslate('btn_new'));
        this.Model.translate.btn_cancel(getTranslate('btn_cancel'));
        this.Model.translate.label_file(getTranslate('label_file'));
        this.Model.translate.label_description(getTranslate('label_description'));
    }

    firstUpdated(changedProperties: any) {


        ko.applyBindings(this.Model, document.getElementById("pnlContent"));

        $(() => {

        })

        this.FillDataGrid();

        GetDataWithoutLoading("config/get_config.php", { getConfig: 'max_file_size,file_extension' })
            .then(data => {
                this.ConfigData = data;
                
                this.Desc.push(html`
                <li>< ${data.max_file_size / 1024 } KB</li>`);
                this.Desc.push(html`
                <li>${data.file_extension}</li>`);

                this.requestUpdate();
            })
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
                    GetData("media_management/select_media.php", null, "#tab1-pane")
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
                                    GetData("media_management/delete_media.php", { pk: dataItem.pk_media }, "#grid")
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
                    field: "full_path",
                    title: getTranslate('label_path'),
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
                    field: "extension",
                    title: getTranslate('label_extension'),
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
                    field: "size",
                    title: getTranslate('label_size'),
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
                    title: getTranslate('label_file'),
                    template: '<img class="img-thumbnail" src="#= full_path #">',
                    width: 150,
                    groupable: false,
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

        var upload = $("#uploader")[0] as HTMLInputElement,
            files = upload.files;

        let formData = new FormData();
        formData.append("fileUpload", files[0]);

        if (files.length > 0 && files[0].size > this.ConfigData.max_file_size) {
            this.Model.setErrors([{fileUploadSize: 'msgInvalidUploadSize'}]);
            return;
        }

        PostDataFile("media_management/insert_media.php", formData, "#tab2-pane")
            .then(data => {
                if (data.errors === undefined && data.message === undefined) {
                    this.ClearScr();
                    AjaxSuccessFunction(data.msg, 3000);
                    this.FillDataGrid();
                }
                this.Model.setErrors(data.errors);
            })
    }

    Cancel_Click() {
        this.ClearScr();
    }

    render() {
        return html`
<div class="container-fluid" id="pnlContent">
    <div class="fade-in">
        <h3><span data-bind="text: translate.menu_media_management"></span></h3>
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
                            <label data-bind="text: translate.label_file" class="form-label"></label> <span class="invalid">*</span>
                            <input id="uploader" type="file" class="form-control">
                            <span class="invalid" data-bind="text: errors.file"></span>
                            <span class="invalid" data-bind="text: errors.fileUploadSize"></span>
                            <span class="invalid" data-bind="text: errors.fileUploadExtension"></span>
                        </div>
                    </div>
                    <div class="col-md-6 p-2">
                        <div class="form-group">
                            <label data-bind="text: translate.label_description" class="form-label"></label> <span class="invalid">*</span>
                            <ul>
                                ${html`${this.Desc}`}
                            </ul>
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