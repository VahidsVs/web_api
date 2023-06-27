import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { 
    getLanguage,
    getTranslate,
    getDirectionFromLanguage } from '../cms_general';

@customElement('cms-notification')
export class CmsNotification extends LitElement {
    createRenderRoot() {
        return this;
    }

    private lcid;

    constructor() {
        super();

        this.lcid = getLanguage();
    }


    //Usage => var t = document.querySelector<FdmNotification>("fdm-notification"); t.showMessage("error", msg);
    showMessage(type: string, message: string, duration = 0) {
        if (type !== '' && message !== '') {
            switch (type) {
                case "success":
                    $("#popupNotification").attr("class","alert alert-success");
                    break;
                case "warning":
                    $("#popupNotification").attr("class","alert alert-warning");
                    break;
                case "danger":
                    $("#popupNotification").attr("class","alert alert-danger");
                    break;
            }

            let translate = getTranslate(message);
            $("#lblMessage")[0].innerText = translate;
            onShow($("#popupNotification"));
            $("#popupNotification").slideDown(500);
            if (duration != 0) {
                $("#btnCloseNotification").hide();
                $("#popupNotification").fadeTo(duration, 500).slideUp(500, function () {
                    $("#popupNotification").slideUp(500);
                });
            }
            else {
                $("#btnCloseNotification").show();
            }
        }

        function onShow(e: any) {

            var element = e,
                eWidth = element.width(),
                eHeight = element.height(),
                wWidth = $(window).width(),
                wHeight = $(window).height(),
                newTop, newLeft;

            newLeft = Math.floor(wWidth / 2 - eWidth / 2);
            newTop = Math.floor(wHeight / 2 - eHeight / 2);

            e.css({ 
                top: newTop,
                left: newLeft,
            });

        }
    }

    firstUpdated(changedProperties: any) {

    }

    Close_Click() {
        $("#popupNotification").slideUp(500);
    }

    render() {
        return html`
<div id="popupNotification" class="alert alert-success" style="position: fixed; display: none; z-index: 999999999;" role="alert">
    <span id="lblMessage"></span>
    <button id="btnCloseNotification" type="button" class="btn-close" @click="${this.Close_Click}"></button>
</div>
        `;
    }
}