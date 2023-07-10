import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { 
    getLanguage,
    getTranslate,
    getDirectionFromLanguage,
    GetData, 
    PostData } from '../../cms_general';
// import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

@customElement('cms-impressum')
class CmsImpressum extends LitElement {
    createRenderRoot() {
        return this;
    }

    //    static get styles() {
    //        return css`
    //`;
    //    }

    private lcid;

    constructor() {
        super();

        this.lcid = getLanguage();

        document.title = "Impressum";
    }

    firstUpdated(changedProperties: any) {

        $(() => {
            
        });
    }

    render() {
        return html`
<!-- Page Header Start -->
<div class="container-fluid page-header py-5">
    <div class="container text-center py-5">
        <h1 class="display-2 text-white mb-4 animated slideInDown">Impressum</h1>
    </div>
</div>
<!-- Page Header End -->

<div class="container-fluid text-center p-5">

    <p>
        <b>
            Offenlegung laut § 25 Mediengesetz
        </b>
    </p>
    <p>
        <b>
            Medieninhaber
        </b>
    </p>
    <p>
        MegaTech Co 
    </p>
    <p>
        <b>
            Die Adresse
        </b>
    </p>
    <p>
        Ludersdorf 247/2 / Bürozentrum 8200 Ludersdorf (Gleisdorf)
    </p>
    <p>
        <br>
    </p>
    <p>
        <b>
            Geschäftsführer:
        </b>
         Milad Tehrani
    </p>
    <p>
        <br>
    </p>
    <p>
        <b>
            Unternehmensgegenstand
        </b>
    </p>
    <p>
        &nbsp;Betrieb eines Onlinedienstes (Internet-Anzeigen-Portal und)
    </p>
    <p>
        <br>
    </p>
    <p>
        <b>
            Telefonnummer :&nbsp;
            <a href="tel:+4366499657071">
                +4366499657071
            </a>
        </b>
    </p>
    <p>
        <b>
            E-mail:
        </b>
         admin@megatechapp.at
    </p>
    <p>
        <br>
    </p>
    <p>
        <b>
            Kammer: 
        </b>
        Wirtschaftskammer Wien; Fachgruppe UBIT; Fachgruppe der gewerblichen Finanzdienstleister.
    </p>
    <p>
        <br>
    </p>
    <p>
        Anwendbare Vorschriften: Österr. Gewerbeordnung 
        <a href="https://www.ris.bka.gv.at/">
            https://www.ris.bka.gv.at/
        </a>
    </p>
    <p>
        Sofern die MegaTech im Zuge von "MegaTech" in Ausübung des Gewerbes unter 
    </p>
    <p>
        <a href="https://www.ris.bka.gv.at/">
            https://www.ris.bka.gv.at/
        </a>
    </p>
    <p>
        <br>
    </p>
    <p>
        MegaTech ist an folgendem Unternehmen unmittelbar beteiligt:
        <b>
             Mega Tech, Weiz
        </b>
    </p>
    <p>
        <b>
            <br>
        </b>
    </p>
    <p>
        <b>
            Kontakt:
        </b>
         Klick hier bzw. per E-Mail unter 
         <b>
            admin@Megatechapp.at
        </b>
    </p>
    <p>
        <b>
            <br>
        </b>
    </p>
    <p>
        Informationen für gewerbliche Kunden zur Mediation: Im Falle einer freiwilligen außergerichtlichen Beilegung von Streitigkeiten mit gewerblichen Nutzern ist MegaTech bereit mit verschiedene Mediationsstellen zusammenzuarbeiten. 
    </p>
    <p>
        <br>
    </p>
    <p>
        <b>
            Dem Stiftungsvorstand gehören an: Vorsitzender Generaldirektor
        </b>
    </p>
    <p>
        <b>
            1. Einverständnis
        </b>
    </p>
    <p>
        Megatech stellt Ihnen diese Website MegaTech Website“) und die Serviceleistungen auf Grundlage der folgenden Nutzungsbedingungen zur Verfügung. Durch Zugriff auf irgendeine Seite dieser MegaTech Website erklären Sie sich mit diesen Nutzungsbedingungen einverstanden.
    </p>
    <p>
        <b>
            2. Geltungsbereich
        </b>
    </p>
    <p>
        MegaTech ist ausschließlich für Inhalte verantwortlich, die selbst erstellt, veröffentlicht und verbreitet werden. Die Nutzungsbedingungen gelten für die Inhalte der Website 
        <a href="http://www.Megatech.at">
            www.Megatech.at
        </a>
         sowie aller zu dieser Domain gehörenden Subdomains.
    </p>
    <p>
        <b>
            3. Copyright
        </b>
    </p>
    <p>
        Der gesamte Inhalt (Texte, Bilder, Illustrationen, Grafiken) der Megatech Website (sowie deren Subdomains) unterliegt dem Urheberrecht und anderen Gesetzen zum Schutze geistigen Eigentums. Falls nichts anders angegeben, ist niemand berechtigt, irgendwelche Informationen dieser Website zu kopieren oder wieder zu veröffentlichen. Die dargestellten Inhalte dieser Website dürfen in keiner Weise kopiert, reproduziert, wieder veröffentlicht, herunterladen, verschickt, übertragen oder verteilt werden. Ausschließlich für den nicht kommerziellen Eigengebrauch ist das Herunterladen von Informationen auf einen Computer gestattet, unter der Bedingung, dass das Urheberrecht und die anderen Eigentumsvorbehalte beachtet werden. Ausnahmen von der Regelung sind ausdrücklich durch den Hinweis „Download“ gekennzeichnet und sind mit der entsprechenden Download-Funktionalität hinterlegt.
    </p>
    <p>
        <b>
            4. Nutzung
        </b>
    </p>
    <p>
        Die Megatech Website steht Ihnen kostenlos zur Verfügung und darf nur für private, nicht kommerzielle Zwecke benutzt werden. Jede Art von Support zu Ihrer Unterstützung erfolgt ausschließlich um Sie zu informieren. Megatech behält sich das Recht vor, Änderungen an der Megatech Website vorzunehmen oder auf Anfragen nicht zu antworten oder keinen Support in Verbindung mit der Megatech Website anzubieten. Es ist nicht gestattet, Websites mit anstößigem oder anderweitig ungeeignetem Inhalt mit der Megatech Website zu verknüpfen oder zu verlinken. Auf Aufforderung von Megatech sind Sie verpflichtet, eine solche Verknüpfung rückgängig zu machen.
    </p>
    <p>
        <b>
            5. Haftungsbeschränkung
        </b>
    </p>
    <p>
        Megatech hat keinerlei Kontrolle über den Inhalt von Websites die außerhalb der Megatech Website liegen auf welche direkt oder indirekt durch „Hyperlinks“ Verweisen wurde. Ewand erklärt hiermit ausdrücklich, dass zum Zeitpunkt der Linksetzung keine illegalen Inhalte auf den zu verlinkenden Seiten erkennbar waren. Auf die aktuelle und zukünftige Gestaltung, die Inhalte oder die Urheberschaft der verlinkten/verknüpften Seiten hat Ewand keinerlei Einfluss. Deshalb distanziert Ewand sich hiermit ausdrücklich von allen Inhalten aller verlinkten /verknüpften Seiten, die nach der Linksetzung verändert wurden. Für illegale, fehlerhafte oder unvollständige Inhalte und insbesondere für Schäden, die aus der Nutzung oder Nichtnutzung solcherart dargebotener Informationen entstehen, haftet allein der Anbieter der Seite, auf welche verwiesen wurde, nicht derjenige, der über Links auf die jeweilige Veröffentlichung lediglich verweist.
    </p>
    <p>
        Die Ewand Website wird von Ihnen auf Ihr eigenes Risiko genutzt. Ewand ist nicht für Schäden verantwortlich, die Ihnen oder Dritten durch die Verwendung der Website entstehen. In jedem Fall ist die Haftung von Ewand für Einkommensausfälle oder entgangenen Gewinn, Verlust von Daten für direkte oder indirekte Schäden, gleich welcher Art, ausgeschlossen. Ewand haftet nicht für Schäden, die sich aus der Nutzung der Ewand Website oder in Verbindung mit der Nutzung, der Unmöglichkeit der Nutzung oder den Ergebnissen der Nutzung dieser Ewand Website, aller mit dieser Ewand Website verbundenen Websites oder dem Inhalt solcher Websites, einschließlich, jedoch nicht beschränkt auf Schäden die durch Fehler, Verzögerungen oder Unterbrechungen in der Übermittlung, bei Störungen der technischen Anlagen und des Services, unrichtige Inhalte, Verlust oder Löschung von Daten entstehen. Sowie Verluste oder Schäden durch Virenbefall Ihrer Computerausstattung, Software, Daten oder anderer Vermögenswerte, die durch Zugriff, Nutzung oder Browsen auf dieser Ewand Website oder durch das Herunterladen von Inhalten dieser Ewand Website oder anderen, mit dieser Ewand Website verbundenen Websites verursacht werden. Dies gilt nicht, soweit z.B. nach dem Produkthaftungsgesetz oder in Fällen des Vorsatzes zwingend gehaftet wird.
    </p>
    <p>
        Ewand schließt hiermit alle Zusicherungen, Gewährleistungen, Garantien oder sonstige Erklärungen in Bezug auf das Anbieten oder das beabsichtigte Anbieten, eine nicht erfolgte Ausführung oder eine verspätete Ausführung von Serviceleistungen in Verbindung mit der Ewand Website oder in Bezug auf Richtigkeit, Vollständigkeit oder Aktualität der Megatech Website aus.
    </p>
    <p>
        <b>
            6. Widerspruch Werbe-Mails
        </b>
    </p>
    <p>
        Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-E-Mails, vor.
    </p>
    <p>
        <b>
            7. Zugriffsdaten
        </b>
    </p>
    <p>
        Der Websitebetreiber bzw. Seitenprovider erhebt Daten über Zugriffe auf die Seite und speichert diese als „Server-Logfiles“ ab. Folgende Daten werden so protokolliert: Besuchte Website, Uhrzeit zum Zeitpunkt des Zugriffes, Menge der gesendeten Daten in Byte, Quelle/Verweis, von welchem Sie auf die Seite gelangten, Verwendeter Browser, Verwendetes Betriebssystem, Verwendete IP-Adresse (ggf.: in anonymisierter Form). Die erhobenen Daten dienen lediglich statistischen Auswertungen und zur Verbesserung der Website. Der Websitebetreiber behält sich allerdings vor, die Server-Logfiles nachträglich zu überprüfen, sollten konkrete Anhaltspunkte auf eine rechtswidrige Nutzung hinweisen.
    </p>
    <p>
        <b>
            8. Anwendbares Recht
        </b>
    </p>
    <p>
        Diese Nutzungsbedingungen unterliegen österreichischem Recht. Ausschließlicher Gerichtsstand bei Streitfragen in Zusammenhang mit diesen Nutzungsbedingungen ist Wien, Österreich
    </p>

</div>
        `;
    }
}