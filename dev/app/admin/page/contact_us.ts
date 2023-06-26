import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { GetData, PostData, PostDataForm, AjaxSuccessFunction, getCookie, GetDataWithoutLoading } from '../../cms_general';
import * as ko from 'knockout';
import { getLangResources } from '../../admin_localization';

@customElement('cms-contactus')
class CmsContactUs extends LitElement {
    createRenderRoot() {
        return this;
    }

    //    static get styles() {
    //        return css`
    //`;
    //    }

    private lcid;
    private resources: any = [];

    private Model = {
        groups: {
            pk_group_role: ko.observable(),
            title: ko.observable(),
        },
        translate: {
            menu_contact_us: ko.observable(),
            tab_title_messages: ko.observable(),

        },
        errors: {
            title: ko.observable(),
        },
        setErrors: (errors: any) => {
            let resources = this.resources;
            this.Model.errors.title(errors ? resources[errors.title] : undefined);
        }
    };

    ClearScr() {
        this.Model.groups.pk_group_role(null);
        this.Model.groups.title("");

        this.Model.errors.title("");

        //@ts-ignore
        $("#myTab button").eq(0).show().tab('show');
        $("#myTab button").eq(1).hide();
    }

    constructor() {
        super();

        this.lcid = getCookie("lcid");
        this.resources = getLangResources()[this.lcid];

        document.title = this.resources[window.location.pathname.toLowerCase()];

        this.Model.translate.menu_contact_us(this.resources['menu_contact_us']);
        this.Model.translate.tab_title_messages(this.resources['tab_title_messages']);
    }

    firstUpdated(changedProperties: any) {

        $(() => {

        })

        ko.applyBindings(this.Model, document.getElementById("pnlContactUs"));


        this.InitGrid();
    }

    InitGrid() {

        if (this.resources['direction'] == "rtl") {
            $("#gridContactUs").addClass("k-rtl");
        } else {
            $("#gridContactUs").addClass("k-ltr");
        }

        let kendoGrid = $("#gridContactUs").data("kendoGrid");
        if (kendoGrid) {
            kendoGrid.destroy();
            $("#gridContactUs").empty();
        }

        let dataSource = new kendo.data.DataSource({
            transport: {
                read: (e) => {
                    GetData("contact_us/select_contact_us.php", null, "#tab1-pane")
                        .then(data => {
                            e.success(data);
                        })
                },
            },
            pageSize: 10,
        });

        let record = 0;

        let grid = $("#gridContactUs").kendoGrid({
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
                    field: "name",
                    title: this.resources['label_name'],
                    width: 100,
                    groupable: false,
                    headerAttributes: { style: "white-space: normal" },
                    filterable: {
                        operators: {
                            string: {
                                contains: this.resources["label_contains"],
                                doesnotcontain: this.resources["label_doesnotcontain"],
                                eq: this.resources["label_equal"],
                                neq: this.resources["label_notequal"],
                            }
                        }
                    },
                },
                {
                    field: "email",
                    title: this.resources['label_email'],
                    width: 100,
                    groupable: false,
                    headerAttributes: { style: "white-space: normal" },
                    filterable: {
                        operators: {
                            string: {
                                contains: this.resources["label_contains"],
                                doesnotcontain: this.resources["label_doesnotcontain"],
                                eq: this.resources["label_equal"],
                                neq: this.resources["label_notequal"],
                            }
                        }
                    },
                },
                {
                    field: "mobile",
                    title: this.resources['label_mobile'],
                    width: 100,
                    groupable: false,
                    headerAttributes: { style: "white-space: normal" },
                    filterable: {
                        operators: {
                            string: {
                                contains: this.resources["label_contains"],
                                doesnotcontain: this.resources["label_doesnotcontain"],
                                eq: this.resources["label_equal"],
                                neq: this.resources["label_notequal"],
                            }
                        }
                    },
                },
                {
                    field: "subject",
                    title: this.resources['label_subject'],
                    width: 100,
                    groupable: false,
                    headerAttributes: { style: "white-space: normal" },
                    filterable: {
                        operators: {
                            string: {
                                contains: this.resources["label_contains"],
                                doesnotcontain: this.resources["label_doesnotcontain"],
                                eq: this.resources["label_equal"],
                                neq: this.resources["label_notequal"],
                            }
                        }
                    },
                },
                {
                    field: "message",
                    title: this.resources['label_message'],
                    width: 400,
                    groupable: false,
                    headerAttributes: { style: "white-space: normal" },
                    filterable: {
                        operators: {
                            string: {
                                contains: this.resources["label_contains"],
                                doesnotcontain: this.resources["label_doesnotcontain"],
                                eq: this.resources["label_equal"],
                                neq: this.resources["label_notequal"],
                            }
                        }
                    },
                },
            ]
        });
    }

    FillDataGrid() {
        let grid = $("#gridContactUs").data("kendoGrid");
        grid.dataSource.read();
        grid.refresh();
    }

    // btnNew_Click() {
    //     this.ClearScr();
    //     //@ts-ignore
    //     $("#myTab button").eq(1).show().tab('show');
    // }

    // Submit_Click() {
    //     if (this.Model.groups.pk_group_role() == null) {
    //         PostDataForm("permission_level_management/insert_group_role.php", ko.toJS(this.Model.groups), "#tab2-pane")
    //             .then(data => {
    //                 if (data.errors === undefined && data.message === undefined) {
    //                     this.ClearScr();
    //                     AjaxSuccessFunction(this.resources[data.msg], 3000);
    //                     this.FillDataGrid();
    //                 }
    //                 this.Model.setErrors(data.errors);
    //             })
    //     }
    //     else {
    //         PostData("permission_level_management/update_group_role.php", ko.toJSON({ pk: this.Model.groups.pk_group_role(), item: this.Model.groups }), "#tab2-pane")
    //             .then(data => {
    //                 if (data.errors === undefined && data.message === undefined) {
    //                     this.ClearScr();
    //                     AjaxSuccessFunction(this.resources[data.msg], 3000);
    //                     this.FillDataGrid();
    //                 }
    //                 this.Model.setErrors(data.errors);
    //             })
    //     }
    // }

    // Cancel_Click() {
    //     this.ClearScr();
    // }

    render() {
        return html`

<div class="container-fluid" id="pnlContactUs">
    <div class="fade-in">
        <h3><span data-bind="text: translate.menu_contact_us"></span></h3>
    </div>
    <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
            <button class="nav-link active" data-bs-target="#tab1-pane" data-bs-toggle="tab">
                <span data-bind="text: translate.tab_title_messages"></span>
            </button>
        </li>
    </ul>
    <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="tab1-pane">
            <div class="container-fluid p-2">
                <div id="gridContactUs"></div>
            </div>
        </div>
    </div>

</div>

        `;
    }
}