import React from 'react'

export default function XmlCuTva({ data }) {
    let item = data || {}

    const getJUD = (elem) => {
        let res = elem.split(",")[0].replace("JUD. ", "")
        return res
    }

    const getLOC = elem => elem.split(",")[1]
    return (
        <small>
            <pre>
               {` <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Invoice xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2" xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2" xmlns:qdt="urn:oasis:names:specification:ubl:schema:xsd:QualifiedDataTypes-2" xmlns:udt="urn:oasis:names:specification:ubl:schema:xsd:UnqualifiedDataTypes-2" xmlns:ccts="urn:un:unece:uncefact:documentation:2" xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2">
    <cbc:UBLVersionID>2.1</cbc:UBLVersionID>
    <cbc:CustomizationID>urn:cen.eu:en16931:2017#compliant#urn:efactura.mfinante.ro:CIUS-RO:1.0.0</cbc:CustomizationID>
    <cbc:ID>${item.nr}</cbc:ID><!--BT-1-->
    <cbc:IssueDate>${item.dt}</cbc:IssueDate><!--BT-2-->
    <cbc:DueDate>${item.scadenta}</cbc:DueDate><!--BT-9-->
    <cbc:InvoiceTypeCode>380</cbc:InvoiceTypeCode><!--BT-3-->
    <cbc:Note>TVA LA INCASARE</cbc:Note><!--BT-22-->
    <cbc:DocumentCurrencyCode>RON</cbc:DocumentCurrencyCode><!--BT-5-->
    <cac:AccountingSupplierParty><!--BG-4-->
        <cac:Party>
            <cac:PostalAddress><!--BG-5-->
                <cbc:StreetName>${item.furnizor.adresa}</cbc:StreetName><!--BT-35-->
                <cbc:CityName>${getLOC(item.furnizor.adresa)}</cbc:CityName><!--BT-37-->
                <cbc:CountrySubentity>${getJUD(item.furnizor.adresa)}</cbc:CountrySubentity><!--BT-39-->
                <cac:Country>
                    <cbc:IdentificationCode>RO</cbc:IdentificationCode><!--BT-40-->
                </cac:Country>
            </cac:PostalAddress>
            <cac:PartyTaxScheme>
                <cbc:CompanyID>${item.furnizor.cui}</cbc:CompanyID><!--BT-31-->
                <cac:TaxScheme>
                    <cbc:ID>VAT</cbc:ID>
                </cac:TaxScheme>
            </cac:PartyTaxScheme>
            <cac:PartyLegalEntity>
                <cbc:RegistrationName>${item.furnizor.name}</cbc:RegistrationName><!--BT-27-->
                <cbc:CompanyLegalForm>Capital social: 200 lei</cbc:CompanyLegalForm><!--BT-33-->
            </cac:PartyLegalEntity>
            <cac:Contact><!--BG-6-->
                <cbc:Telephone>0744845674</cbc:Telephone><!--BT-42-->
                <cbc:ElectronicMail>${item.furnizor.email || "emailulDvs@domeniu.ro"}</cbc:ElectronicMail><!--BT-43-->
            </cac:Contact>
        </cac:Party>
    </cac:AccountingSupplierParty>
    <cac:AccountingCustomerParty><!--BG-7-->
        <cac:Party>
            <cac:PostalAddress><!--BG-8-->
                <cbc:StreetName>${item.beneficiar.name}</cbc:StreetName><!--BT-50-->
                <cbc:CityName>${getLOC(item.beneficiar.adresa)}</cbc:CityName><!--BT-52-->
                <cbc:CountrySubentity>RO-AR</cbc:CountrySubentity><!--BT-54-->
                <cac:Country>
                    <cbc:IdentificationCode>RO</cbc:IdentificationCode><!--BT-55-->
                </cac:Country>
            </cac:PostalAddress>
            <cac:PartyTaxScheme>
                <cbc:CompanyID>${item.beneficiar.cui}</cbc:CompanyID><!--BT-48-->
                <cac:TaxScheme>
                    <cbc:ID>VAT</cbc:ID>
                </cac:TaxScheme>
            </cac:PartyTaxScheme>
            <cac:PartyLegalEntity>
                <cbc:RegistrationName>${item.beneficiar.name}</cbc:RegistrationName><!--BT-44-->
            </cac:PartyLegalEntity>
            <cac:Contact><!--BG-9-->
                <cbc:Name>${item.beneficiar.name}</cbc:Name><!--BT-56-->
                <cbc:ElectronicMail>${item.beneficiar.email || "emailulBeneficiarului@domeniu.ro"}</cbc:ElectronicMail><!--BT-58-->
            </cac:Contact>
        </cac:Party>
    </cac:AccountingCustomerParty>
    <cac:TaxTotal>
        <cbc:TaxAmount currencyID="RON">53.20</cbc:TaxAmount><!--BT-110-->
        <cac:TaxSubtotal><!--BG-23-->
            <cbc:TaxableAmount currencyID="RON">280.00</cbc:TaxableAmount><!--BT-116-->
            <cbc:TaxAmount currencyID="RON">53.20</cbc:TaxAmount><!--BT-117-->
            <cac:TaxCategory>
                <cbc:ID>S</cbc:ID><!--BT-118-->
                <cbc:Percent>19.00</cbc:Percent><!--BT-119-->
                <cac:TaxScheme>
                    <cbc:ID>VAT</cbc:ID>
                </cac:TaxScheme>
            </cac:TaxCategory>
        </cac:TaxSubtotal>
    </cac:TaxTotal>
    <cac:LegalMonetaryTotal><!--BG-22-->
        <cbc:LineExtensionAmount currencyID="RON">280.00</cbc:LineExtensionAmount><!--BT-106-->
        <cbc:TaxExclusiveAmount currencyID="RON">280.00</cbc:TaxExclusiveAmount><!--BT-109-->
        <cbc:TaxInclusiveAmount currencyID="RON">333.20</cbc:TaxInclusiveAmount><!--BT-112-->
        <cbc:AllowanceTotalAmount currencyID="RON">0.00</cbc:AllowanceTotalAmount><!--BT-107-->
        <cbc:ChargeTotalAmount currencyID="RON">0</cbc:ChargeTotalAmount><!--BT-108-->
        <cbc:PrepaidAmount currencyID="RON">0</cbc:PrepaidAmount><!--BT-113-->
        <cbc:PayableRoundingAmount currencyID="RON">0.00</cbc:PayableRoundingAmount><!--BT-114-->
        <cbc:PayableAmount currencyID="RON">333.20</cbc:PayableAmount><!--BT-115-->
    </cac:LegalMonetaryTotal>
    <cac:InvoiceLine>
        <cbc:ID>1</cbc:ID><!--BT-126-->
        <cbc:InvoicedQuantity unitCode="EA">1.0000</cbc:InvoicedQuantity><!--BT-129 BT-130-->
        <cbc:LineExtensionAmount currencyID="RON">280.00</cbc:LineExtensionAmount><!--BT-131-->
        <cac:Item><!--BG-31-->
            <cbc:Name>Servicii informatice cf contract nr.1  / 01.01.2022 - prest.IUNIE 2022</cbc:Name><!--BT-153-->
            <cac:ClassifiedTaxCategory>
                <cbc:ID>S</cbc:ID><!--BT-151-->
                <cbc:Percent>19.00</cbc:Percent><!--BT-152-->
                <cac:TaxScheme>
                    <cbc:ID>VAT</cbc:ID>
                </cac:TaxScheme>
            </cac:ClassifiedTaxCategory>
        </cac:Item>
        <cac:Price><!--BG-29-->
            <cbc:PriceAmount currencyID="RON">280.00</cbc:PriceAmount><!--BT-146-->
            <cbc:BaseQuantity unitCode="EA">1.0000</cbc:BaseQuantity><!--BT-149 BT-150-->
        </cac:Price>
    </cac:InvoiceLine>
</Invoice>`}

                

            </pre>
        </small>
    )
}
