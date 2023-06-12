import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { GetData, PostData, AjaxSuccessFunction, AjaxWarningFunction, AjaxDangerFunction } from '../../cms_general';
import { getLangResources } from '../../site_localization';
import jsPDF from 'jspdf';
import * as ko from 'knockout';

@customElement('cms-test')
class CmsTest extends LitElement {
    createRenderRoot() {
        return this;
    }

    //    static get styles() {
    //        return css`
    //`;
    //    }

    constructor() {
        super();
    }

    private TempData:any = "TempData";

    firstUpdated(changedProperties: any) {

        $(() => {
        })
        
    }

    NotificationSuccessWithTime_Click() {
        AjaxSuccessFunction("پیام موفقیت با زمان", 3000);
    }

    NotificationSuccessWithoutTime_Click() {
        AjaxSuccessFunction("پیام موفقیت بدون زمان");
    }

    NotificationWarningWithTime_Click() {
        AjaxWarningFunction("پیام هشدار با زمان", 3000);
    }

    NotificationWarningWithoutTime_Click() {
        AjaxWarningFunction("پیام هشدار بدون زمان");
    }

    NotificationDangerWithTime_Click() {
        AjaxDangerFunction("پیام خطا با زمان", 3000);
    }

    NotificationDangerWithoutTime_Click() {
        AjaxDangerFunction("پیام خطا بدون زمان");
    }


    Popup_Click(){
        //@ts-ignore
        $("#windowPopup").modal("show");
    }


    async ConvertToPDF_Click() {

        const toBase64: any = (file: any) => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
        });

        const file = $('#imgUploader').prop('files')[0];
        var base64 = await toBase64(file);

        var doc = new jsPDF({
            orientation: 'landscape',
            unit: 'px',
            format: [500, 200]
          });

        doc.addImage(base64, "png", 0, 0, 500, 200);
        doc.addPage();
        doc.addImage(base64, "png", 0, 0, 500, 200);
        doc.addPage();
        doc.addImage(base64, "png", 0, 0, 500, 200);
        doc.save('1.pdf');
    }

    
    GetDataForGrid1_Click() {
        var data = [
            { ID: 1, Title: "عنوان 1", Summary: "خلاصه 1", Description: "توضیحات 1" },
            { ID: 2, Title: "عنوان 2", Summary: "خلاصه 2", Description: "توضیحات 2" },
            { ID: 3, Title: "عنوان 3", Summary: "خلاصه 3", Description: "توضیحات 3" },
            { ID: 4, Title: "عنوان 4", Summary: "خلاصه 4", Description: "توضیحات 4" },
            { ID: 5, Title: "عنوان 5", Summary: "خلاصه 5", Description: "توضیحات 5" },

            { ID: 1, Title: "عنوان 1", Summary: "خلاصه 1", Description: "توضیحات 1" },
            { ID: 2, Title: "عنوان 2", Summary: "خلاصه 2", Description: "توضیحات 2" },
            { ID: 3, Title: "عنوان 3", Summary: "خلاصه 3", Description: "توضیحات 3" },
            { ID: 4, Title: "عنوان 4", Summary: "خلاصه 4", Description: "توضیحات 4" },
            { ID: 5, Title: "عنوان 5", Summary: "خلاصه 5", Description: "توضیحات 5" },
            
            { ID: 1, Title: "عنوان 1", Summary: "خلاصه 1", Description: "توضیحات 1" },
            { ID: 2, Title: "عنوان 2", Summary: "خلاصه 2", Description: "توضیحات 2" },
            { ID: 3, Title: "عنوان 3", Summary: "خلاصه 3", Description: "توضیحات 3" },
            { ID: 4, Title: "عنوان 4", Summary: "خلاصه 4", Description: "توضیحات 4" },
            { ID: 5, Title: "عنوان 5", Summary: "خلاصه 5", Description: "توضیحات 5" },
            
            { ID: 1, Title: "عنوان 1", Summary: "خلاصه 1", Description: "توضیحات 1" },
            { ID: 2, Title: "عنوان 2", Summary: "خلاصه 2", Description: "توضیحات 2" },
            { ID: 3, Title: "عنوان 3", Summary: "خلاصه 3", Description: "توضیحات 3" },
            { ID: 4, Title: "عنوان 4", Summary: "خلاصه 4", Description: "توضیحات 4" },
            { ID: 5, Title: "عنوان 5", Summary: "خلاصه 5", Description: "توضیحات 5" },
            
            { ID: 1, Title: "عنوان 1", Summary: "خلاصه 1", Description: "توضیحات 1" },
            { ID: 2, Title: "عنوان 2", Summary: "خلاصه 2", Description: "توضیحات 2" },
            { ID: 3, Title: "عنوان 3", Summary: "خلاصه 3", Description: "توضیحات 3" },
            { ID: 4, Title: "عنوان 4", Summary: "خلاصه 4", Description: "توضیحات 4" },
            { ID: 5, Title: "عنوان 5", Summary: "خلاصه 5", Description: "توضیحات 5" },
            
            { ID: 1, Title: "عنوان 1", Summary: "خلاصه 1", Description: "توضیحات 1" },
            { ID: 2, Title: "عنوان 2", Summary: "خلاصه 2", Description: "توضیحات 2" },
            { ID: 3, Title: "عنوان 3", Summary: "خلاصه 3", Description: "توضیحات 3" },
            { ID: 4, Title: "عنوان 4", Summary: "خلاصه 4", Description: "توضیحات 4" },
            { ID: 5, Title: "عنوان 5", Summary: "خلاصه 5", Description: "توضیحات 5" },
            
            { ID: 1, Title: "عنوان 1", Summary: "خلاصه 1", Description: "توضیحات 1" },
            { ID: 2, Title: "عنوان 2", Summary: "خلاصه 2", Description: "توضیحات 2" },
            { ID: 3, Title: "عنوان 3", Summary: "خلاصه 3", Description: "توضیحات 3" },
        ];

        //@ts-ignore
        $("#grid").grid({
            toolbar: [
                { 
                    name: "btnNew",//-> must declared in class template
                    template: '<button class="btn btn-primary smfp-btnNew"><span class="fa fa-plus"></span> جدید</button>',
                    click: (e: any) => {
                        alert("جدید");
                    },
                },
            ],
            checkboxColumn: true,
            rowIndexColumn: true,
            searchable: true,
            pagable: {
                pageSize: 10,
            },
            // dataBound: (row: any) => {
            //     console.log($(row));
            //     console.log($("#grid").data("grid"));
            //     $(row).css("color", "red");
            // },
            data: data,
            columns: [
                {
                    title: "ویرایش",
                    command: true,
                    name: "btnEdit",//-> must declared in class template
                    template: '<button class="btn btn-secondary smfp-btnEdit"><span class="fa fa-pencil"></span></button>',
                    click: (e: any) => {

                        let row = $(e.currentTarget).closest("tr")[0];
                        var dataItem = $("#grid").data("grid").dataItem(row);

                        console.log(dataItem);
                        alert("ویرایش");
                    },
                },
                {
                    title: "حذف",
                    command: true,
                    name: "btnDelete",//-> must declared in class template
                    template: '<button class="btn btn-danger smfp-btnDelete"><span class="fa fa-close"></span></button>',
                    click: (e: any) => {

                        let row = $(e.currentTarget).closest("tr")[0];
                        var dataItem = $("#grid").data("grid").dataItem(row);
                        
                        console.log(dataItem);
                        alert("حذف");
                    },
                },
                {
                    field: "Title",
                    title: "عنوان",
                    width: "200px",
                },
                {
                    field: "Summary",
                    title: "خلاصه",
                    width: "200px",
                },
                {
                    field: "Description",
                    title: "توضیحات",
                    width: "200px",
                    searchable: false,
                },
            ],
        });
    }

    GetDataForGrid2_Click() {
        var data = [
            { ID: 1, Title: "عنوان 1", Summary: "خلاصه 1", Description: "توضیحات 1" },
            { ID: 2, Title: "عنوان 2", Summary: "خلاصه 2", Description: "توضیحات 2" },
            { ID: 3, Title: "عنوان 3", Summary: "خلاصه 3", Description: "توضیحات 3" },
            { ID: 4, Title: "عنوان 4", Summary: "خلاصه 4", Description: "توضیحات 4" },
            { ID: 5, Title: "عنوان 5", Summary: "خلاصه 5", Description: "توضیحات 5" },

            { ID: 1, Title: "عنوان 1", Summary: "خلاصه 1", Description: "توضیحات 1" },
            { ID: 2, Title: "عنوان 2", Summary: "خلاصه 2", Description: "توضیحات 2" },
            { ID: 3, Title: "عنوان 3", Summary: "خلاصه 3", Description: "توضیحات 3" },
        ];

        var grid = $("#grid").data("grid");
        if(grid){
            grid.setData(data);
            grid.refresh();
        }
    }

    GetCheckedData_Click() {
        var grid = $("#grid").data("grid");
        if(grid){
            var getCheckedData = grid.getCheckedData();
            console.log(getCheckedData);
            AjaxSuccessFunction(getCheckedData.length, 3000);
        }
    }

    GetDataForCombo_Click() {
        var data = [
            { ID: 1, Title: "عنوان 1", Summary: "خلاصه 1", Description: "توضیحات 1" },
            { ID: 2, Title: "عنوان 2", Summary: "خلاصه 2", Description: "توضیحات 2" },
            { ID: 3, Title: "عنوان 3", Summary: "خلاصه 3", Description: "توضیحات 3" },
            { ID: 4, Title: "عنوان 4", Summary: "خلاصه 4", Description: "توضیحات 4" },
            { ID: 5, Title: "عنوان 5", Summary: "خلاصه 5", Description: "توضیحات 5" },

            { ID: 1, Title: "عنوان 1", Summary: "خلاصه 1", Description: "توضیحات 1" },
            { ID: 2, Title: "عنوان 2", Summary: "خلاصه 2", Description: "توضیحات 2" },
            { ID: 3, Title: "عنوان 3", Summary: "خلاصه 3", Description: "توضیحات 3" },
            { ID: 4, Title: "عنوان 4", Summary: "خلاصه 4", Description: "توضیحات 4" },
            { ID: 5, Title: "عنوان 5", Summary: "خلاصه 5", Description: "توضیحات 5" },
            
            { ID: 1, Title: "عنوان 1", Summary: "خلاصه 1", Description: "توضیحات 1" },
            { ID: 2, Title: "عنوان 2", Summary: "خلاصه 2", Description: "توضیحات 2" },
            { ID: 3, Title: "عنوان 3", Summary: "خلاصه 3", Description: "توضیحات 3" },
            { ID: 4, Title: "عنوان 4", Summary: "خلاصه 4", Description: "توضیحات 4" },
            { ID: 5, Title: "عنوان 5", Summary: "خلاصه 5", Description: "توضیحات 5" },
            
            { ID: 1, Title: "عنوان 1", Summary: "خلاصه 1", Description: "توضیحات 1" },
            { ID: 2, Title: "عنوان 2", Summary: "خلاصه 2", Description: "توضیحات 2" },
            { ID: 3, Title: "عنوان 3", Summary: "خلاصه 3", Description: "توضیحات 3" },
            { ID: 4, Title: "عنوان 4", Summary: "خلاصه 4", Description: "توضیحات 4" },
            { ID: 5, Title: "عنوان 5", Summary: "خلاصه 5", Description: "توضیحات 5" },
            
            { ID: 1, Title: "عنوان 1", Summary: "خلاصه 1", Description: "توضیحات 1" },
            { ID: 2, Title: "عنوان 2", Summary: "خلاصه 2", Description: "توضیحات 2" },
            { ID: 3, Title: "عنوان 3", Summary: "خلاصه 3", Description: "توضیحات 3" },
            { ID: 4, Title: "عنوان 4", Summary: "خلاصه 4", Description: "توضیحات 4" },
            { ID: 5, Title: "عنوان 5", Summary: "خلاصه 5", Description: "توضیحات 5" },
            
            { ID: 1, Title: "عنوان 1", Summary: "خلاصه 1", Description: "توضیحات 1" },
            { ID: 2, Title: "عنوان 2", Summary: "خلاصه 2", Description: "توضیحات 2" },
            { ID: 3, Title: "عنوان 3", Summary: "خلاصه 3", Description: "توضیحات 3" },
            { ID: 4, Title: "عنوان 4", Summary: "خلاصه 4", Description: "توضیحات 4" },
            { ID: 5, Title: "عنوان 5", Summary: "خلاصه 5", Description: "توضیحات 5" },
            
            { ID: 1, Title: "عنوان 1", Summary: "خلاصه 1", Description: "توضیحات 1" },
            { ID: 2, Title: "عنوان 2", Summary: "خلاصه 2", Description: "توضیحات 2" },
            { ID: 3, Title: "عنوان 3", Summary: "خلاصه 3", Description: "توضیحات 3" },
        ];

        //@ts-ignore
        $("#combo").combo({
            emptyMessage: "انتخاب کنید ...",
            searchable: true,
            data: data,
            dataValueField: "ID",
            dataTextField: "Title",
        });
    }

    GetSelectedCombo_Click() {
        let select = $("#combo").data("combo").select();
        AjaxSuccessFunction(select, 3000);
    }

    GetDataForMultiselect_Click() {
        var data = [
            { ID: 1, Title: "عنوان 1", Summary: "خلاصه 1", Description: "توضیحات 1" },
            { ID: 2, Title: "عنوان 2", Summary: "خلاصه 2", Description: "توضیحات 2" },
            { ID: 3, Title: "عنوان 3", Summary: "خلاصه 3", Description: "توضیحات 3" },
            { ID: 4, Title: "عنوان 4", Summary: "خلاصه 4", Description: "توضیحات 4" },
            { ID: 5, Title: "عنوان 5", Summary: "خلاصه 5", Description: "توضیحات 5" },

            { ID: 1, Title: "عنوان 1", Summary: "خلاصه 1", Description: "توضیحات 1" },
            { ID: 2, Title: "عنوان 2", Summary: "خلاصه 2", Description: "توضیحات 2" },
            { ID: 3, Title: "عنوان 3", Summary: "خلاصه 3", Description: "توضیحات 3" },
            { ID: 4, Title: "عنوان 4", Summary: "خلاصه 4", Description: "توضیحات 4" },
            { ID: 5, Title: "عنوان 5", Summary: "خلاصه 5", Description: "توضیحات 5" },
            
            { ID: 1, Title: "عنوان 1", Summary: "خلاصه 1", Description: "توضیحات 1" },
            { ID: 2, Title: "عنوان 2", Summary: "خلاصه 2", Description: "توضیحات 2" },
            { ID: 3, Title: "عنوان 3", Summary: "خلاصه 3", Description: "توضیحات 3" },
            { ID: 4, Title: "عنوان 4", Summary: "خلاصه 4", Description: "توضیحات 4" },
            { ID: 5, Title: "عنوان 5", Summary: "خلاصه 5", Description: "توضیحات 5" },
            
            { ID: 1, Title: "عنوان 1", Summary: "خلاصه 1", Description: "توضیحات 1" },
            { ID: 2, Title: "عنوان 2", Summary: "خلاصه 2", Description: "توضیحات 2" },
            { ID: 3, Title: "عنوان 3", Summary: "خلاصه 3", Description: "توضیحات 3" },
            { ID: 4, Title: "عنوان 4", Summary: "خلاصه 4", Description: "توضیحات 4" },
            { ID: 5, Title: "عنوان 5", Summary: "خلاصه 5", Description: "توضیحات 5" },
            
            { ID: 1, Title: "عنوان 1", Summary: "خلاصه 1", Description: "توضیحات 1" },
            { ID: 2, Title: "عنوان 2", Summary: "خلاصه 2", Description: "توضیحات 2" },
            { ID: 3, Title: "عنوان 3", Summary: "خلاصه 3", Description: "توضیحات 3" },
            { ID: 4, Title: "عنوان 4", Summary: "خلاصه 4", Description: "توضیحات 4" },
            { ID: 5, Title: "عنوان 5", Summary: "خلاصه 5", Description: "توضیحات 5" },
            
            { ID: 1, Title: "عنوان 1", Summary: "خلاصه 1", Description: "توضیحات 1" },
            { ID: 2, Title: "عنوان 2", Summary: "خلاصه 2", Description: "توضیحات 2" },
            { ID: 3, Title: "عنوان 3", Summary: "خلاصه 3", Description: "توضیحات 3" },
            { ID: 4, Title: "عنوان 4", Summary: "خلاصه 4", Description: "توضیحات 4" },
            { ID: 5, Title: "عنوان 5", Summary: "خلاصه 5", Description: "توضیحات 5" },
            
            { ID: 1, Title: "عنوان 1", Summary: "خلاصه 1", Description: "توضیحات 1" },
            { ID: 2, Title: "عنوان 2", Summary: "خلاصه 2", Description: "توضیحات 2" },
            { ID: 3, Title: "عنوان 3", Summary: "خلاصه 3", Description: "توضیحات 3" },
        ];

        //@ts-ignore
        $("#multiselect").multiselect({
            emptyMessage: "انتخاب کنید ...",
            searchable: true,
            data: data,
            dataValueField: "ID",
            dataTextField: "Title",
        });
    }

    GetSelectedMultiselect_Click() {
        let select = $("#multiselect").data("multiselect").select();
        AjaxSuccessFunction(select, 3000);
    }

    SetLangEn_Click() {
        let lcid = 'en';
        document.cookie = "lcid=" + lcid + "; path=/;SameSite=None;Secure";

        location.reload();
    }

    SetLangFa_Click() {
        let lcid = 'fa';
        document.cookie = "lcid=" + lcid + "; path=/;SameSite=None;Secure";

        location.reload();
    }

    render() {
        return html`
<cms-notification></cms-notification>

<div class="container-fluid">
    <div class="card m-2">
        <div id="test"></div>
        <div class="card-header">
            تغییر زبان
        </div>
        <div class="card-body">
            <button class="btn btn-success" @click="${this.SetLangFa_Click}">فارسی</button>
            <button class="btn btn-success" @click="${this.SetLangEn_Click}">انگلیسی</button>
        </div>
    </div>
    <div class="card m-2">
        <div id="test"></div>
        <div class="card-header">
            مالتی سلکت
        </div>
        <div class="card-body">
            <button class="btn btn-success" @click="${this.GetDataForMultiselect_Click}">ساخت مالتی سلکت و نمایش اطلاعات</button>
            <button class="btn btn-success" @click="${this.GetSelectedMultiselect_Click}">گرفتن کمبوی انتخاب شده</button>
            <br/><br/>
            <div class="row">
                <div class="col-md-6">
                    <div id="multiselect"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="card m-2">
        <div id="test"></div>
        <div class="card-header">
            کمبوباکس
        </div>
        <div class="card-body">
            <button class="btn btn-success" @click="${this.GetDataForCombo_Click}">ساخت کمبو و نمایش اطلاعات</button>
            <button class="btn btn-success" @click="${this.GetSelectedCombo_Click}">گرفتن کمبوی انتخاب شده</button>
            <br/><br/>
            <div class="row">
                <div class="col-md-6">
                    <div id="combo"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="card m-2">
        <div id="test"></div>
        <div class="card-header">
            گرید
        </div>
        <div class="card-body">
            <button class="btn btn-success" @click="${this.GetDataForGrid1_Click}">ساخت گرید و نمایش اطلاعات اول</button>
            <button class="btn btn-success" @click="${this.GetDataForGrid2_Click}">نمایش اطلاعات دوم</button>
            <button class="btn btn-success" @click="${this.GetCheckedData_Click}">گرفتن سطرهای انتخاب شده</button>
            <br/><br/>
            <div id="grid"></div>
        </div>
    </div>
    <div class="card m-2">
        <div id="test"></div>
        <div class="card-header">
            عکس به پی دی اف
        </div>
        <div class="card-body">
            <input type="file" id="imgUploader" class="form-control">
            <button class="btn btn-success" @click="${this.ConvertToPDF_Click}">تبدیل به پی دی اف</button>
        </div>
    </div>
    <div class="card m-2">
        <div class="card-header">
            نوتیفیکیشن
        </div>
        <div class="card-body">
            <button class="btn btn-success" @click="${this.NotificationSuccessWithTime_Click}">موفقیت با زمان</button>
            <button class="btn btn-success" @click="${this.NotificationSuccessWithoutTime_Click}">موفقیت بدون زمان</button>
            <button class="btn btn-warning" @click="${this.NotificationWarningWithTime_Click}">هشدار با زمان</button>
            <button class="btn btn-warning" @click="${this.NotificationWarningWithoutTime_Click}">هشدار بدون زمان</button>
            <button class="btn btn-danger" @click="${this.NotificationDangerWithTime_Click}">خطا با زمان</button>
            <button class="btn btn-danger" @click="${this.NotificationDangerWithoutTime_Click}">خطا بدون زمان</button>
        </div>
    </div>
    <div class="card m-2">
        <div class="card-header">
            پاپ آپ (Window)
        </div>
        <div class="card-body">
            <div id="windowPopup" class="modal fade" style="display: none"
                tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-6">عنوان پاپ آپ</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row p-2">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="control-label">متن پیام: </label>
                                        <textarea data-bind="value: data.NationalCode" class="form-control"></textarea>
                                        <span data-bind="text: errors.NationalCode" class="invalid"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary">ارسال</button>
                        </div>
                    </div>
                </div>
            </div>
            <button class="btn btn-secondary" @click="${this.Popup_Click}">نمایش</button>
        </div>
    </div>
</div>
        `;
    }
}