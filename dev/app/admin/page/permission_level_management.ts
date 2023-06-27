import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { 
    getLanguage,
    getTranslate,
    getDirectionFromLanguage,
    GetData, 
    PostData, 
    PostDataForm, 
    AjaxSuccessFunction, 
    GetDataWithoutLoading } from '../../cms_general';
import * as ko from 'knockout';

@customElement('cms-permissionlevelmanagement')
class CmsPermissionLevelManagement extends LitElement {
    createRenderRoot() {
        return this;
    }

    //    static get styles() {
    //        return css`
    //`;
    //    }

    private lcid;

    private Roles: any = [];
    @state()
    private HtmlRoles: any;

    private AllRoles: any = [];

    private Model = {
        groups: {
            pk_group_role: ko.observable(),
            title: ko.observable(),
        },
        translate: {
            menu_permission_level_management: ko.observable(),
            tab_title_groups: ko.observable(),
            tab_title_details: ko.observable(),
            tab_title_grouproles: ko.observable(),
            tab_title_groupusers: ko.observable(),
            tab_title_allusers: ko.observable(),
            label_title: ko.observable(),
            window_title_selectuser: ko.observable(),
            btn_new: ko.observable(),
            btn_submit: ko.observable(),
            btn_cancel: ko.observable(),
        },
        errors: {
            title: ko.observable(),
        },
        setErrors: (errors: any) => {
            this.Model.errors.title(errors ? getTranslate(errors.title) : undefined);
        }
    };

    ClearScrGroups() {
        this.Model.groups.pk_group_role(null);
        this.Model.groups.title("");

        this.Model.errors.title("");

        //@ts-ignore
        $("#myTab button").eq(0).show().tab('show');
        $("#myTab button").eq(1).hide();
        $("#myTab button").eq(2).hide();
        $("#myTab button").eq(3).hide();
    }

    constructor() {
        super();

        this.lcid = getLanguage();

        document.title = getTranslate('menu_permission_level_management');

        this.Model.translate.menu_permission_level_management(getTranslate('menu_permission_level_management'));
        this.Model.translate.tab_title_groups(getTranslate('tab_title_groups'));
        this.Model.translate.tab_title_details(getTranslate('tab_title_details'));
        this.Model.translate.tab_title_grouproles(getTranslate('tab_title_grouproles'));
        this.Model.translate.tab_title_groupusers(getTranslate('tab_title_groupusers'));
        this.Model.translate.tab_title_allusers(getTranslate('tab_title_allusers'));
        this.Model.translate.label_title(getTranslate('label_title'));
        this.Model.translate.window_title_selectuser(getTranslate('window_title_selectuser'));
        this.Model.translate.btn_new(getTranslate('btn_new'));
        this.Model.translate.btn_submit(getTranslate('btn_submit'));
        this.Model.translate.btn_cancel(getTranslate('btn_cancel'));

        GetDataWithoutLoading("permission_level_management/select_role.php", null)
            .then(allRoles => {
                this.AllRoles = allRoles;
            });
    }

    firstUpdated(changedProperties: any) {

        $(() => {

        })

        ko.applyBindings(this.Model, document.getElementById("pnlGroupManagement"));


        this.InitGridGroups();
        this.InitGridUsers();
        this.InitGridSelectUser();
        this.InitGridAllUsers();
    }

    InitGridGroups() {

        if (getDirectionFromLanguage(this.lcid) == "rtl") {
            $("#gridGroups").addClass("k-rtl");
        } else {
            $("#gridGroups").addClass("k-ltr");
        }

        let kendoGrid = $("#gridGroups").data("kendoGrid");
        if (kendoGrid) {
            kendoGrid.destroy();
            $("#gridGroups").empty();
        }

        let dataSource = new kendo.data.DataSource({
            transport: {
                read: (e) => {
                    GetData("permission_level_management/select_group_role.php", null, "#tab1-pane")
                        .then(data => {
                            e.success(data);
                        })
                },
            },
            pageSize: 10,
        });

        let record = 0;

        let grid = $("#gridGroups").kendoGrid({
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
                        template: "<a class='btn btn-info k-grid-Select'><span class='fa fa-check-square'></span></a>",
                        click: (e: any) => {
                            e.preventDefault();

                            let row = $(e.currentTarget).closest("tr")[0];
                            var dataItem: any = $("#gridGroups").data("kendoGrid").dataItem(row);

                            //@ts-ignore
                            $("#myTab button").eq(2).show().tab('show');
                            $("#myTab button").eq(3).show()

                            this.Model.groups.pk_group_role(dataItem.pk_group_role);
                            this.Model.groups.title(dataItem.title);

                            this.GenerateRoles(dataItem.pk_group_role);
                            this.FillDataGridUsers();
                        }
                    }
                },
                {
                    title: getTranslate('btn_edit'),
                    width: 100,
                    command: {
                        name: "Edit",
                        template: "<a class='btn btn-secondary k-grid-Edit'><span class='fa fa-pencil-square'></span></a>",
                        click: (e: any) => {
                            e.preventDefault();

                            let row = $(e.currentTarget).closest("tr")[0];
                            var dataItem: any = $("#gridGroups").data("kendoGrid").dataItem(row);

                            this.ClearScrGroups();

                            //@ts-ignore
                            $("#myTab button").eq(1).show().tab('show');

                            this.Model.groups.pk_group_role(dataItem.pk_group_role);
                            this.Model.groups.title(dataItem.title);
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
                            var dataItem: any = $("#gridGroups").data("kendoGrid").dataItem(row);
                            
                            //@ts-ignore
                            $("<div></div>").confirm({
                                okText: getTranslate('label_yes'),
                                cancelText: getTranslate('label_no'),
                                title: getTranslate('btn_delete'),
                                content: getTranslate('msg_are_you_sure'),
                                okCallback: () => {
                                    GetData("permission_level_management/delete_group_role.php", { pk: dataItem.pk_group_role }, "#gridGroups")
                                        .then(data => {
                                            if (data.message === undefined) {
                                                AjaxSuccessFunction(data.msg, 3000);

                                                this.FillDataGridGroups();
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
                    width: 400,
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

    InitGridUsers() {
        
        if (getDirectionFromLanguage(this.lcid) == "rtl") {
            $("#gridUsers").addClass("k-rtl");
        } else {
            $("#gridUsers").addClass("k-ltr");
        }

        let kendoGrid = $("#gridUsers").data("kendoGrid");
        if (kendoGrid) {
            kendoGrid.destroy();
            $("#gridUsers").empty();
        }

        let dataSource = new kendo.data.DataSource({
            transport: {
                read: (e) => {
                    GetData("permission_level_management/select_user_in_group.php", { fkGroup: this.Model.groups.pk_group_role() }, "#tab4-pane")
                        .then(data => {
                            e.success(data);
                        })
                },
            },
            pageSize: 10,
        });

        let record = 0;

        let grid = $("#gridUsers").kendoGrid({
            //toolbar: ["excel"],
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
                            var dataItem: any = $("#gridUsers").data("kendoGrid").dataItem(row);
                            
                            //@ts-ignore
                            $("<div></div>").confirm({
                                okText: getTranslate('label_yes'),
                                cancelText: getTranslate('label_no'),
                                title: getTranslate('btn_delete'),
                                content: getTranslate('msg_are_you_sure'),
                                okCallback: () => {
                                    GetData("permission_level_management/delete_user_in_group.php", { fkUser: dataItem.fk_user }, "#tab4-pane")
                                        .then(data => {
                                            if (data.message === undefined) {
                                                AjaxSuccessFunction(data.msg, 3000);

                                                this.FillDataGridUsers();
                                                this.FillDataGridAllUsers();
                                            }
                                        });
                                }
                            }).data("confirm").show();
                        }
                    }
                },
                {
                    field: "username",
                    title: getTranslate('label_username'),
                    width: 200,
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
                    field: "firstname",
                    title: getTranslate('label_firstname'),
                    width: 200,
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
                    field: "lastname",
                    title: getTranslate('label_lastname'),
                    width: 200,
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
                    field: "mobile",
                    title: getTranslate('label_mobile'),
                    width: 200,
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

    InitGridSelectUser() {
        
        if (getDirectionFromLanguage(this.lcid) == "rtl") {
            $("#gridSelectUser").addClass("k-rtl");
        } else {
            $("#gridSelectUser").addClass("k-ltr");
        }

        let kendoGrid = $("#gridSelectUser").data("kendoGrid");
        if (kendoGrid) {
            kendoGrid.destroy();
            $("#gridSelectUser").empty();
        }

        let dataSource = new kendo.data.DataSource({
            transport: {
                read: (e) => {
                    GetData("permission_level_management/select_all_user.php", null, "#windowSelectUser")
                        .then(data => {
                            e.success(data);
                        })
                },
            },
            pageSize: 10,
        });

        let record = 0;

        let grid = $("#gridSelectUser").kendoGrid({
            //toolbar: ["excel"],
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
                        template: "<a class='btn btn-info k-grid-Select'><span class='fa fa-check-square'></span></a>",
                        click: (e: any) => {
                            e.preventDefault();

                            let row = $(e.currentTarget).closest("tr")[0];
                            var dataItem: any = $("#gridSelectUser").data("kendoGrid").dataItem(row);

                            PostData("permission_level_management/insert_user_in_group.php", ko.toJSON({ fkGroup: this.Model.groups.pk_group_role(), fkUser: dataItem.pk_user }), "#windowSelectUser")
                                .then(data => {
                                    if (data.message === undefined) {
                                        AjaxSuccessFunction(data.msg, 3000);

                                        this.FillDataGridUsers();
                                        this.FillDataGridAllUsers();

                                        //@ts-ignore
                                        $("#windowSelectUser").modal("hide");
                                    }
                                });
                        }
                    }
                },
                {
                    field: "username",
                    title: getTranslate('label_username'),
                    width: 200,
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
                    field: "firstname",
                    title: getTranslate('label_firstname'),
                    width: 200,
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
                    field: "lastname",
                    title: getTranslate('label_lastname'),
                    width: 200,
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
                    field: "mobile",
                    title: getTranslate('label_mobile'),
                    width: 200,
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

    InitGridAllUsers() {
        
        if (getDirectionFromLanguage(this.lcid) == "rtl") {
            $("#gridAllUsers").addClass("k-rtl");
        } else {
            $("#gridAllUsers").addClass("k-ltr");
        }

        let kendoGrid = $("#gridAllUsers").data("kendoGrid");
        if (kendoGrid) {
            kendoGrid.destroy();
            $("#gridAllUsers").empty();
        }

        let dataSource = new kendo.data.DataSource({
            transport: {
                read: (e) => {
                    GetData("permission_level_management/select_all_user.php", null, "#tab5-pane")
                        .then(data => {
                            e.success(data);
                        })
                },
            },
            pageSize: 10,
        });

        let record = 0;

        let grid = $("#gridAllUsers").kendoGrid({
            //toolbar: ["excel"],
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
                    field: "username",
                    title: getTranslate('label_username'),
                    width: 200,
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
                    field: "firstname",
                    title: getTranslate('label_firstname'),
                    width: 200,
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
                    field: "lastname",
                    title: getTranslate('label_lastname'),
                    width: 200,
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
                    field: "mobile",
                    title: getTranslate('label_mobile'),
                    width: 200,
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
                    field: "groupTitle",
                    title: getTranslate('label_grouptitle'),
                    width: 200,
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

    FillDataGridGroups() {
        let grid = $("#gridGroups").data("kendoGrid");
        grid.dataSource.read();
        grid.refresh();
    }

    FillDataGridUsers() {
        let grid = $("#gridUsers").data("kendoGrid");
        grid.dataSource.read();
        grid.refresh();
    }

    FillDataGridSelectUser() {
        let grid = $("#gridSelectUser").data("kendoGrid");
        grid.dataSource.read();
        grid.refresh();
    }

    FillDataGridAllUsers() {
        let grid = $("#gridAllUsers").data("kendoGrid");
        grid.dataSource.read();
        grid.refresh();
    }

    btnNewGroup_Click() {
        this.ClearScrGroups();
        //@ts-ignore
        $("#myTab button").eq(1).show().tab('show');
        $("#myTab button").eq(2).hide()
        $("#myTab button").eq(3).hide()
    }

    SubmitGroup_Click() {
        if (this.Model.groups.pk_group_role() == null) {
            PostDataForm("permission_level_management/insert_group_role.php", ko.toJS(this.Model.groups), "#tab2-pane")
                .then(data => {
                    if (data.errors === undefined && data.message === undefined) {
                        this.ClearScrGroups();
                        AjaxSuccessFunction(data.msg, 3000);
                        this.FillDataGridGroups();
                        this.FillDataGridAllUsers();
                    }
                    this.Model.setErrors(data.errors);
                })
        }
        else {
            PostData("permission_level_management/update_group_role.php", ko.toJSON({ pk: this.Model.groups.pk_group_role(), item: this.Model.groups }), "#tab2-pane")
                .then(data => {
                    if (data.errors === undefined && data.message === undefined) {
                        this.ClearScrGroups();
                        AjaxSuccessFunction(data.msg, 3000);
                        this.FillDataGridGroups();
                        this.FillDataGridAllUsers();
                    }
                    this.Model.setErrors(data.errors);
                })
        }
    }

    CancelGroup_Click() {
        this.ClearScrGroups();
    }

    GenerateRoles(pkGroup: any) {
         
        GetData("permission_level_management/select_role_in_group.php", { fk: pkGroup }, "#tab3-pane")
            .then( groupRoles => {

                this.Roles = [];
                for (let i = 0; i < this.AllRoles.length; i++) {
                    const element = this.AllRoles[i];
                    
                    let isInRole = false;
                    if (groupRoles.find((p: any) => p.pk_role == element.pk_role))
                        isInRole = true;

                    if (isInRole == true)
                        this.Roles.push(html`
                            <div class="form-check" style="padding-top: 5px;">
                                <input class="form-check-input" type="checkbox" id="${element.pk_role}" name="${element.pk_role}" checked />
                                <label class="form-check-label" for="${element.pk_role}">${getTranslate(element.description)}</label>
                            </div>
                        `);
                    else
                        this.Roles.push(html`
                            <div class="form-check" style="padding-top: 5px;">
                                <input class="form-check-input" type="checkbox" id="${element.pk_role}" name="${element.pk_role}" />
                                <label class="form-check-label" for="${element.pk_role}">${getTranslate(element.description)}</label>
                            </div>
                        `);
                }

                this.HtmlRoles = html`${this.Roles}`;
            })
    }

    SubmitRoles_Click() {
        let checkedItems = [];

        let checkboxes = $("#chboxRoles input");
        for (let i = 0; i < checkboxes.length; i++) {
            const element = checkboxes[i] as HTMLInputElement;
            if (element.checked == true){
                checkedItems.push(element.id);
            }
        }

        let join = checkedItems.join(',');
        
        PostData("permission_level_management/insert_delete_role_in_group.php", ko.toJSON({ fkGroup: this.Model.groups.pk_group_role(), roles: join}), "#tab3-pane")
            .then(data => {
                if(data.message == undefined) {
                    AjaxSuccessFunction(data.msg, 3000);
                    this.GenerateRoles(this.Model.groups.pk_group_role());
                }
            })
    }

    CancelRoles_Click() {
        this.ClearScrGroups();
    }

    btnNewUserGroup_Click() {
        //@ts-ignore
        $("#windowSelectUser").modal("show");

        this.FillDataGridSelectUser();
    }

    render() {
        return html`

<div class="container-fluid" id="pnlGroupManagement">
    <div class="fade-in">
        <h3><span data-bind="text: translate.menu_permission_level_management"></span> <span data-bind="text: groups.title() ? '(' + groups.title() + ')' : ''"></span></h3>
    </div>
    <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
            <button class="nav-link active" data-bs-target="#tab1-pane" data-bs-toggle="tab">
                <span data-bind="text: translate.tab_title_groups"></span>
            </button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" style="display: none;" data-bs-target="#tab2-pane" data-bs-toggle="tab">
                <span data-bind="text: translate.tab_title_details"></span>
            </button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" style="display: none;" data-bs-target="#tab3-pane" data-bs-toggle="tab">
                <span data-bind="text: translate.tab_title_grouproles"></span>
            </button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" style="display: none;" data-bs-target="#tab4-pane" data-bs-toggle="tab">
                <span data-bind="text: translate.tab_title_groupusers"></span>
            </button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" data-bs-target="#tab5-pane" data-bs-toggle="tab">
                <span data-bind="text: translate.tab_title_allusers"></span>
            </button>
        </li>
    </ul>
    <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="tab1-pane">
            <div class="container-fluid p-2">
                <div class="row">
                    <div class="col-md-12 p-2">
                        <button class="btn btn-primary" @click="${this.btnNewGroup_Click}"><span class="fa fa-plus"></span> <span data-bind="text: translate.btn_new"></span></button>
                    </div>
                </div>
                <div id="gridGroups"></div>
            </div>
        </div>
        <div class="tab-pane fade" id="tab2-pane">
            <div class="container-fluid p-2">
                <div class="row p-2">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label data-bind="text: translate.label_title" class="form-label"></label><span class="invalid">*</span>
                            <input type="text" class="form-control" data-bind="value: groups.title">
                            <span class="invalid" data-bind="text: errors.title"></span>
                        </div>
                    </div>
                </div>
                <div class="row p-2">
                    <div class="col-md-6">
                        <div class="form-group">
                            <button @click="${this.SubmitGroup_Click}" class="btn btn-success"><span class="fa fa-save"></span> <span data-bind="text: translate.btn_submit"></span></button>
                            <button @click="${this.CancelGroup_Click}" class="btn btn-danger"><span class="fa fa-close"></span> <span data-bind="text: translate.btn_cancel"></span></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="tab-pane fade" id="tab3-pane">
            <div class="container-fluid">
                <div class="row p-2">
                    <div id="chboxRoles">
                        ${this.HtmlRoles}
                    </div>
                </div>
                <div class="row p-2">
                    <div class="col-md-6">
                        <div class="form-group">
                            <button @click="${this.SubmitRoles_Click}" class="btn btn-success"><span class="fa fa-save"></span> <span data-bind="text: translate.btn_submit"></span></button>
                            <button @click="${this.CancelRoles_Click}" class="btn btn-danger"><span class="fa fa-close"></span> <span data-bind="text: translate.btn_cancel"></span></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="tab-pane fade" id="tab4-pane">
            <div class="container-fluid p-2">
                <div class="row">
                    <div class="col-md-12 p-2">
                        <button class="btn btn-primary" @click="${this.btnNewUserGroup_Click}"><span class="fa fa-plus"></span> <span data-bind="text: translate.btn_new"></span></button>
                    </div>
                </div>
                <div id="gridUsers"></div>
            </div>
        </div>
        <div class="tab-pane fade" id="tab5-pane">
            <div class="container-fluid p-2">
                <div id="gridAllUsers"></div>
            </div>
        </div>
    </div>



    <div id="windowSelectUser" class="modal fade" style="display: none"
        tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 data-bind="text: translate.window_title_selectuser" class="modal-title fs-6"></h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                <div id="gridSelectUser"></div>
                </div>
            </div>
        </div>
    </div>

</div>

        `;
    }
}