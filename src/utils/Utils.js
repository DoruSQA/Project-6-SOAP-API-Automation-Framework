import { XMLParser } from 'fast-xml-parser';

export function parseXml(xml) {
    const parser = new XMLParser();

    return parser.parse(xml);
}


export function populateXmlValues(stringTemplate, values = {}) {

    let result = stringTemplate;

    for (const [key, value] of Object.entries(values)) {
        result = result.replaceAll(`\${${key}}`, String(value));
    }

    return result;
}

export function display(responsePayload)
{
    console.dir(responsePayload, { depth: null });
}

export function removeXmlField(xml, fieldName) {
    const regex = new RegExp(
        `<${fieldName}>[\\s\\S]*?<\\/${fieldName}>`,
        'g'
    );

    return xml.replace(regex, '');
}
