export default class GenericField {
    name: string;
    label: string;

    constructor(name: string, label: string) {
        this.name = name;
        this.label = label;
    }

    forView(value: any) {
        throw new Error('Called superclass');
    }

    forFilter() {
        throw new Error('Called superclass');
    }

    forForm() {
        throw new Error('Called superclass');
    }

    forFormInitialValue(value: any) {
        throw new Error('Called superclass');
    }

    forExport() {
        throw new Error('Called superclass');
    }

    forImport() {
        throw new Error('Called superclass');
    }
}
