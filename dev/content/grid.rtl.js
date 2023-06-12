
//requirements: bootstrap 5.2.3, jquery 3.5.1, font-awesome 4.7.0
(function ($) {
    grid = function () {
        this.init.apply(this, arguments);
    };

    grid.prototype = {
        constructor: grid.prototype.constructor,
        defaultOptions: {
            toolbar: [],//=> { name: commandName, template: templateOfToolbarItem, click: onClick }
            checkboxColumn: false,
            rowIndexColumn: false,
            searchable: false,
            data: [],
            columns: [],//=> { field: dbField, title: headerTitle, name: commandName, command: true/false, template: templateOfCell, click: onClickForCommand, width: widthOfHeader, searchable: true/false }
            pagable: false,//=> false or { pageSize: # }
            dataBound: null,//=> null or (e) => {}
        },

        options: {},

        currentPage: 1,
        skip: 0,
        take: 0,
        totalPages: 0,

        init: function (element, options) {
            //main element
            this.$element = element;

            this.options = $.extend(true, {}, this.defaultOptions, options);

            this.setData(this.options.data);

            this.refresh();
        },

        //مقدار دهی مجدد فقط دیتا
        setData: function (data) {
            
            this.options.data = data;

            var defaultOptionsColumns = {
                command: false, 
                searchable: true,
            }

            //تعیین مقدار پیش فرض برای ستون ها
            for (let i = 0; i < this.options.columns.length; i++) {
                this.options.columns[i] = $.extend(true, {}, defaultOptionsColumns, this.options.columns[i]);
            }

            //برای هر کدام از دیتاها یک آیدی یونیک برای خودمان میسازیم که در گرید استفاده کنیم
            for (let i = 0; i < this.options.data.length; i++) {
                this.options.data[i] = { item: this.options.data[i], _uid: generate_uuidv4() };
            }

            function generate_uuidv4() {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
                    function (c) {
                        var uuid = Math.random() * 16 | 0, v = c == 'x' ? uuid : (uuid & 0x3 | 0x8);
                        return uuid.toString(16);
                    });
            }
        },

        //گرفتن دیتای یک ردیف
        dataItem: function (row) {
            return this.options.data.find(p => p._uid == row.getAttribute("data-uid")).item;
        },

        //گرفتن دیتاهای انتخاب شده
        getCheckedData: function () {
            var rows = $(this.$element).find(".selectOne:checked").closest("tr");
            var checkedData = [];
            for (let i = 0; i < rows.length; i++) {
                const element = rows[i];
                checkedData.push(this.options.data.find(p => p._uid == element.getAttribute("data-uid")).item);
            }
            return checkedData;
        },

        //بازسازی گرید
        refresh: function () {

            var that = $(this.$element)
            that.empty();

            var settings = this.options;

            //ساخت تولبار
            var toolbar = ``;
            var toolbarMaster = ``
            if (settings.toolbar.length != 0) {
                var toolbarItems = ``;
                for (let i = 0; i < settings.toolbar.length; i++) {
                    const element = settings.toolbar[i];
                    toolbarItems += element.template;
                }
                toolbarMaster = `
                    <div class="col-md-6">
                        ${toolbarItems}
                    </div>
                `;
                toolbar = `
                    <div class="grid-header">
                        <div class="row d-flex align-items-center">
                            ${toolbarMaster}
                        </div>
                    </div>
                `;
            }
            if (settings.searchable != false) {
                var searchItems = ``;
                var searchableColumns = settings.columns.filter(p => p.searchable == true && p.command == false);
                for (let i = 0; i < searchableColumns.length; i++) {
                    const element = searchableColumns[i];
                    searchItems += `
                        <option value="${element.field}">${element.title}</option>
                    `;
                }
                toolbarMaster += `
                    <div class="col-md-6 smfp-pnlSearch">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="form-label">جستجو در ستون:</label>
                                    <select class="form-select smfp-cmbSearch">
                                        ${searchItems}
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="form-label">عبارت جستجو:</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control smfp-txtSearch" />
                                        <button class="input-group-text smfp-btnSearch"><span class="fa fa-search"></span></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                
                toolbar = `
                    <div class="grid-header">
                        <div class="row d-flex align-items-center">
                            ${toolbarMaster}
                        </div>
                    </div>
                `;
            }

            //ساخت ستون های گرید
            var columns = `
            ${settings.checkboxColumn == true ? `<th><input class="selectAll" type="checkbox"></th>` : ``}
            ${settings.rowIndexColumn == true ? `<th>#</th>` : ``}
            `;
            settings.columns.forEach(element => {
                columns += `
                <th ${element.width ? `style="min-width: ${element.width};"` : ``}>${element.title}</th>
                `;
            });

            var tempData = settings.data;
            //این متد را نوشتیم که بتوانیم از این متد برای سرچ استفاده کنیم
            const render = () => {
                var totalTempData = tempData.length;
                //ساخت سطر های گرید
                if (settings.pagable != false) {
                    //محاسبات مربوط به صفحه بندی
                    this.skip = (this.currentPage * settings.pagable.pageSize) - settings.pagable.pageSize;
                    this.take = (this.currentPage * settings.pagable.pageSize);
                    this.totalPages = Math.ceil(tempData.length / settings.pagable.pageSize);
                    tempData = tempData.slice(this.skip, this.take);
                }
                var data = ``;
                for (let dataIndex = 0; dataIndex < tempData.length; dataIndex++) {
                    var tds = ``;
                    for (let columnsIndex = 0; columnsIndex < settings.columns.length; columnsIndex++) {
                        tds += `<td>${settings.columns[columnsIndex].template !== undefined ? settings.columns[columnsIndex].template : tempData[dataIndex].item[settings.columns[columnsIndex].field]}</td>`;
                    }

                    data += `
                    <tr data-uid="${tempData[dataIndex]._uid}">
                        ${settings.checkboxColumn == true ? `<th><input class="selectOne" type="checkbox"></th>` : ``}
                        ${settings.rowIndexColumn == true ? `<th>${settings.pagable == false ? (dataIndex + 1) : ((settings.pagable.pageSize) * (this.currentPage - 1)) + (dataIndex + 1)}</th>` : ``}
                        ${tds}
                    </tr>
                    `;
                }

                //ساخت پیجر گرید
                var pagination = ``;
                if (settings.pagable != false) {
                    var pages = ``;
                    for (let i = 1; i <= this.totalPages; i++) {
                        pages += `
                            <li class="page-item">
                                <button class="page-link${i == this.currentPage ? ' active' : ''}">${i}</button>
                            </li>
                        `;
                    }

                    pagination = `
                        <nav aria-label="Page navigation">
                            <ul class="pagination">
                                <li class="page-item">
                                    <button class="page-link" aria-label="First">
                                        <span aria-hidden="true" class="fa fa-angle-double-right"></span>
                                    </button>
                                </li>
                                <li class="page-item">
                                    <button class="page-link" aria-label="Previous">
                                        <span aria-hidden="true" class="fa fa-angle-right"></span>
                                    </button>
                                </li>
                                ${pages}
                                <li class="page-item">
                                    <button class="page-link" aria-label="Next">
                                        <span aria-hidden="true" class="fa fa-angle-left"></span>
                                    </button>
                                </li>
                                <li class="page-item">
                                    <button class="page-link" aria-label="Last">
                                        <span aria-hidden="true" class="fa fa-angle-double-left"></span>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    `;
                }

                //ساخت گرید
                that.append(`
                    <div class="grid">
                        ${toolbar}
                        <div class="grid-body table-responsive">
                            <table class="table table-striped table-hover table-bordered align-middle">
                                <thead class="table-light">
                                    <tr>
                                        ${columns}
                                    </tr>
                                </thead>
                                <tbody>
                                    ${data}
                                </tbody>
                            </table>
                        </div>
                        <div class="grid-footer">
                            <div class="row d-flex align-items-center">
                                <div class="col-sm-6">
                                    ${pagination}
                                </div>
                                <div class="col-sm-6 d-flex justify-content-end">
                                    تعداد کل: ${totalTempData}
                                </div>
                            </div>
                        </div>
                    </div>
                `);

                //اگر پیجر وجود داشت دکمه های پیجر کار کند
                if (settings.pagable != false) {
                    that.find(".page-item").on("click", (e) => {
                        e.preventDefault();
                        var pager = e.target.nodeName === "SPAN" ? e.target.parentElement : e.target;

                        switch (pager.getAttribute("aria-label")) {
                            case "Next":
                                if (this.currentPage != this.totalPages)
                                    this.currentPage++;
                                break;
                            case "Previous":
                                if (this.currentPage != 1)
                                    this.currentPage--;
                                break;
                            case "First":
                                this.currentPage = 1;
                                break;
                            case "Last":
                                this.currentPage = this.totalPages;
                                break;

                            default:
                                this.currentPage = parseInt(pager.innerText);
                                break;
                        }
                        this.refresh();
                    });
                }

                //اگر ستون های کامندی داشتیم
                let commandColumns = settings.columns.filter(p => p.command == true);
                if (commandColumns.length != 0) {
                    for (let i = 0; i < commandColumns.length; i++) {
                        const element = commandColumns[i];
                        that.find(`.smfp-${element.name}`).on("click", element.click);
                    }
                }
    
                //انتخاب همه چک باکس ها
                that.find(".selectAll").on("click", (e) => {
                    var checkboxes = that.find("input[type=checkbox]");
                    var isChecked = e.target.checked;
                    for (let i = 0; i < checkboxes.length; i++) {
                        checkboxes[i].checked = isChecked;
                    }
                });
    
                //اگر تولبار داشتیم متدش را بنویس
                if (settings.toolbar.length != 0) {
                    for (let i = 0; i < settings.toolbar.length; i++) {
                        const element = settings.toolbar[i];
                        that.find(`.smfp-${element.name}`).on("click", element.click);
                    }
                }
    
                //اگر ایونت دیتاباند مقدار دهی شده بود
                if (this.options.dataBound != null) {
                    let rows = that.find("tbody tr");
                    for (let i = 0; i < rows.length; i++) {
                        this.options.dataBound(rows[i]);
                    }
                }
    
                //نوشتن دکمه جستجو
                if (settings.searchable != false) {
                    let cmbSearch = that.find(".smfp-pnlSearch .smfp-cmbSearch");
                    let txtSearch = that.find(".smfp-pnlSearch .smfp-txtSearch");
                    let btnSearch = that.find(".smfp-pnlSearch .smfp-btnSearch");

                    Search = () => {
                        let cmbSearchValue = cmbSearch.val();
                        let txtSearchValue = txtSearch.val();

                        //باید کل دیتا نمایش داده شود
                        if(cmbSearchValue == undefined || txtSearchValue == "") {
                            tempData = settings.data;
                            this.currentPage = 1;
                            that.empty();
                            render();
                        }
                        else {
                            var tmpColumn = settings.columns.find(p => p.field == cmbSearchValue);
                            tempData = settings.data.filter(p => p.item[tmpColumn.field].includes(txtSearchValue));
                            this.currentPage = 1;
                            that.empty();
                            render();
                            that.find(".smfp-pnlSearch .smfp-cmbSearch").val(cmbSearchValue);
                            that.find(".smfp-pnlSearch .smfp-txtSearch").val(txtSearchValue);
                        }
                    }

                    cmbSearch.on("keypress", (e) => {
                        if (e.which == 13) {
                            Search();
                            return false;
                        }
                    });
                    txtSearch.on("keypress", (e) => {
                        if (e.which == 13) {
                            Search();
                            return false;
                        }
                    });
                    btnSearch.on("click", (e) => {
                        Search();
                    })
                }
            }

            render();
        },
    };

    $.fn.grid = function (options) {
        return this.each(function () {
            if (!$(this).data('grid'))
                $(this).data('grid', new grid(this, options));
            else
                $(this).data('grid', new grid(this, options));
        });
    }

}(jQuery));