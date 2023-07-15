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
    GetDataWithoutLoading,
    getRandomIntInclusive
} from '../../../cms_general';
import * as ko from 'knockout';

@customElement('cms-mediapick')
class CmsMediaPick extends LitElement {
    createRenderRoot() {
        return this;
    }

    //    static get styles() {
    //        return css`
    //`;
    //    }

    private lcid;

    private PostfixID: any;

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

        this.PostfixID = getRandomIntInclusive(10000000, 99999999);
    }

    firstUpdated(changedProperties: any) {


        ko.applyBindings(this.Model, document.getElementById("pnlContent" + this.PostfixID));

        $(() => {

        })

        this.FillDataGrid();
    }

    FillDataGrid() {

        let kendoWidget = $("#grid" + this.PostfixID).data("kendoGrid");
        if (kendoWidget) {
            // kendoGrid.destroy();
            // $("#grid").empty();
            kendoWidget.dataSource.read();
            kendoWidget.refresh();
            return;
        }

        if (getDirectionFromLanguage(this.lcid) == "rtl") {
            $("#grid" + this.PostfixID).addClass("k-rtl");
        } else {
            $("#grid" + this.PostfixID).addClass("k-ltr");
        }

        let dataSource = new kendo.data.DataSource({
            transport: {
                read: (e) => {
                    GetData("media_management/select_media.php", null, "pnlContent" + this.PostfixID)
                        .then(data => {
                            e.success(data);
                        })
                },
            },
            pageSize: 10,
        });

        let record = 0;

        let grid = $("#grid" + this.PostfixID).kendoGrid({
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
                    title: getTranslate('btn_select'),
                    width: 100,
                    command: {
                        name: "Select",
                        template: "<a class='btn btn-success k-grid-Select'><span class='fa fa-check'></span></a>",
                        click: (e: any) => {
                            e.preventDefault();

                            let row = $(e.currentTarget).closest("tr")[0];
                            var dataItem: any = $("#grid" + this.PostfixID).data("kendoGrid").dataItem(row);

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
                    title: getTranslate('label_file'),
                    template: '<img class="img-thumbnail" width="50px" src="#= full_path #">',
                    width: 150,
                    groupable: false,
                },
            ]
        });
    }

    render() {
        return html`
<div class="container-fluid" id="pnlContent">
    <div class="fade-in">
        <h3><span data-bind="text: translate.menu_media_management"></span></h3>
    </div>
</div>
<div id="windowPopup${this.PostfixID}" class="modal fade" style="display: none"
    tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-6" data-bind="text: translate.label_file"></h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div id="grid${this.PostfixID}"></div>
            </div>
        </div>
    </div>
</div>
        `;
    }
}