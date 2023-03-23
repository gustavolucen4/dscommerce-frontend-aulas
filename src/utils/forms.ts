export function update(inputs: any, name: string, newValue: any) {
    return { ...inputs, [name]: { ...inputs[name], value: newValue } };
}

export function toValues(inputs: any) {
    const data: any = {};
    for (var obj in inputs) {
        data[obj] = inputs[obj].value;
    }

    return data;
}

export function updateAll(inputs: any, newValues: any) {
    const newObj: any = {}
    for (var name in inputs) {
        newObj[name] = { ...inputs[name], value: newValues[name] }
    }

    return newObj;
}

export function validate(inputs: any, name: string) {

    if (!inputs[name].validation) {
        return inputs;
    }

    const isInvalid = !inputs[name].validation(inputs[name].value);
    return { ...inputs, [name]: { ...inputs[name], invalid: isInvalid.toString() } };
}

export function toDirty(inputs: any, name: string) {

    return { ...inputs, [name]: { ...inputs[name], dirty: true } };
}

export function updateAndValidate(inputs: any, name: string, newValues: any){
    const dataUpdate = update(inputs, name, newValues);
    return validate(dataUpdate, name);
}

export function dirtyAndValidate(inputs: any, name: string){
    const dataDirty = toDirty(inputs, name);
    return validate(dataDirty, name);
}