import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { GetData, PostData, PostDataForm, AjaxSuccessFunction, getCookie, GetDataWithoutLoading } from '../../cms_general';
import * as ko from 'knockout';
import { getLangResources } from '../../admin_localization';

@customElement('cms-permissionlevelmanagement')
class CmsPermissionLevelManagement extends LitElement {
    createRenderRoot() {
        return this;
    }

    //    static get styles() {
    //        return css`
    //`;
    //    }

    private lcid = 'fa';
    private resources: any = [];

    private Roles: any = [];
    @state()
    private HtmlRoles: any;

    private AllRoles: any = [];

    private Model = {
        groups: {
            pk_group_role: ko.observable(),
            title: ko.observable(),
        },
        errors: {
            title: ko.observable(),
        },
        setErrors: function (errors: any) {
            let lcid = getCookie("lcid");
            let resources = getLangResources()[lcid];
            this.errors.title(errors ? resources[errors.title] : undefined);
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

        this.lcid = getCookie("lcid");
        this.resources = getLangResources()[this.lcid];

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

        if (this.resources['direction'] == "rtl") {
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
                    title: this.resources['btn_select'],
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
                    title: this.resources['btn_edit'],
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
                    title: this.resources['btn_delete'],
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
                                okText: this.resources['label_yes'],
                                cancelText: this.resources['label_no'],
                                title: this.resources['btn_delete'],
                                content: this.resources['msg_are_you_sure'],
                                okCallback: () => {
                                    GetData("permission_level_management/delete_group_role.php", { pk: dataItem.pk_group_role }, "#gridGroups")
                                        .then(data => {
                                            if (data.message === undefined) {
                                                AjaxSuccessFunction(this.resources[data.msg], 3000);

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
                    title: this.resources['label_title'],
                    width: 400,
                    groupable: false,
                    headerAttributes: { style: "white-space: normal" },
                },
            ]
        });
    }

    InitGridUsers() {
        
        if (this.resources['direction'] == "rtl") {
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
                    title: this.resources['btn_delete'],
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
                                okText: this.resources['label_yes'],
                                cancelText: this.resources['label_no'],
                                title: this.resources['btn_delete'],
                                content: this.resources['msg_are_you_sure'],
                                okCallback: () => {
                                    GetData("permission_level_management/delete_user_in_group.php", { fkUser: dataItem.fk_user }, "#tab4-pane")
                                        .then(data => {
                                            if (data.message === undefined) {
                                                AjaxSuccessFunction(this.resources[data.msg], 3000);

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
                    title: this.resources['label_username'],
                    width: 200,
                    groupable: false,
                    headerAttributes: { style: "white-space: normal" },
                },
                {
                    field: "firstname",
                    title: this.resources['label_firstname'],
                    width: 200,
                    groupable: false,
                    headerAttributes: { style: "white-space: normal" },
                },
                {
                    field: "lastname",
                    title: this.resources['label_lastname'],
                    width: 200,
                    groupable: false,
                    headerAttributes: { style: "white-space: normal" },
                },
                {
                    field: "mobile",
                    title: this.resources['label_mobile'],
                    width: 200,
                    groupable: false,
                    headerAttributes: { style: "white-space: normal" },
                },
            ]
        });
    }

    InitGridSelectUser() {
        
        if (this.resources['direction'] == "rtl") {
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
                    title: this.resources['btn_select'],
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
                                        AjaxSuccessFunction(this.resources[data.msg], 3000);

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
                    title: this.resources['label_username'],
                    width: 200,
                    groupable: false,
                    headerAttributes: { style: "white-space: normal" },
                },
                {
                    field: "firstname",
                    title: this.resources['label_firstname'],
                    width: 200,
                    groupable: false,
                    headerAttributes: { style: "white-space: normal" },
                },
                {
                    field: "lastname",
                    title: this.resources['label_lastname'],
                    width: 200,
                    groupable: false,
                    headerAttributes: { style: "white-space: normal" },
                },
                {
                    field: "mobile",
                    title: this.resources['label_mobile'],
                    width: 200,
                    groupable: false,
                    headerAttributes: { style: "white-space: normal" },
                },
            ]
        });
    }

    InitGridAllUsers() {
        
        if (this.resources['direction'] == "rtl") {
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
                    title: this.resources['label_username'],
                    width: 200,
                    groupable: false,
                    headerAttributes: { style: "white-space: normal" },
                },
                {
                    field: "firstname",
                    title: this.resources['label_firstname'],
                    width: 200,
                    groupable: false,
                    headerAttributes: { style: "white-space: normal" },
                },
                {
                    field: "lastname",
                    title: this.resources['label_lastname'],
                    width: 200,
                    groupable: false,
                    headerAttributes: { style: "white-space: normal" },
                },
                {
                    field: "mobile",
                    title: this.resources['label_mobile'],
                    width: 200,
                    groupable: false,
                    headerAttributes: { style: "white-space: normal" },
                },
                {
                    field: "groupTitle",
                    title: this.resources['label_grouptitle'],
                    width: 200,
                    groupable: false,
                    headerAttributes: { style: "white-space: normal" },
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
                        AjaxSuccessFunction(this.resources[data.msg], 3000);
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
                        AjaxSuccessFunction(this.resources[data.msg], 3000);
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
                                <label class="form-check-label" for="${element.pk_role}">${this.resources[element.description]}</label>
                            </div>
                        `);
                    else
                        this.Roles.push(html`
                            <div class="form-check" style="padding-top: 5px;">
                                <input class="form-check-input" type="checkbox" id="${element.pk_role}" name="${element.pk_role}" />
                                <label class="form-check-label" for="${element.pk_role}">${this.resources[element.description]}</label>
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
                    AjaxSuccessFunction(this.resources[data.msg], 3000);
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
        <h3><span name="translate" caption="/admin/permission-level-management.html"></span> <span data-bind="text: groups.title() ? '(' + groups.title() + ')' : ''"></span></h3>
    </div>
    <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
            <button class="nav-link active" data-bs-target="#tab1-pane" data-bs-toggle="tab">
                <span name="translate" caption="tab_title_groups"></span>
            </button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" style="display: none;" data-bs-target="#tab2-pane" data-bs-toggle="tab">
                <span name="translate" caption="tab_title_details"></span>
            </button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" style="display: none;" data-bs-target="#tab3-pane" data-bs-toggle="tab">
                <span name="translate" caption="tab_title_grouproles"></span>
            </button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" style="display: none;" data-bs-target="#tab4-pane" data-bs-toggle="tab">
                <span name="translate" caption="tab_title_groupusers"></span>
            </button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" data-bs-target="#tab5-pane" data-bs-toggle="tab">
                <span name="translate" caption="tab_title_allusers"></span>
            </button>
        </li>
    </ul>
    <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="tab1-pane">
            <div class="container-fluid p-2">
                <div class="row">
                    <div class="col-md-12 p-2">
                        <button class="btn btn-primary" @click="${this.btnNewGroup_Click}"><span class="fa fa-plus"></span> <span name="translate" caption="btn_new"></span></button>
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
                            <label name="translate" caption="label_title" class="form-label"></label><span class="invalid">*</span>
                            <input type="text" class="form-control" data-bind="value: groups.title">
                            <span class="invalid" data-bind="text: errors.title"></span>
                        </div>
                    </div>
                </div>
                <div class="row p-2">
                    <div class="col-md-6">
                        <div class="form-group">
                            <button @click="${this.SubmitGroup_Click}" class="btn btn-success"><span class="fa fa-save"></span> <span name="translate" caption="btn_submit"></span></button>
                            <button @click="${this.CancelGroup_Click}" class="btn btn-danger"><span class="fa fa-close"></span> <span name="translate" caption="btn_cancel"></span></button>
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
                            <button @click="${this.SubmitRoles_Click}" class="btn btn-success"><span class="fa fa-save"></span> <span name="translate" caption="btn_submit"></span></button>
                            <button @click="${this.CancelRoles_Click}" class="btn btn-danger"><span class="fa fa-close"></span> <span name="translate" caption="btn_cancel"></span></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="tab-pane fade" id="tab4-pane">
            <div class="container-fluid p-2">
                <div class="row">
                    <div class="col-md-12 p-2">
                        <button class="btn btn-primary" @click="${this.btnNewUserGroup_Click}"><span class="fa fa-plus"></span> <span name="translate" caption="btn_new"></span></button>
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
                    <h1 name="translate" caption="window_title_selectuser" class="modal-title fs-6"></h1>
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