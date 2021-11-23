module.exports = {
    GET : Symbol.for('GET'),
    POST : Symbol.for('POST'),
    PUT : Symbol.for('PUT'),
    PATCH : Symbol.for('PATCH'),
    DELETE : Symbol.for('DELETE'),
    ALL : Symbol.for('ALL'),
    
    select : function(methodType){
        let methodName;
        switch(methodType){
            case this.GET:
                methodName='get';
                break;
            case this.POST:
                methodName='post';
                break;
            case this.PUT:
                methodName='put';
                break;
            case this.PATCH:
                methodName='patch';
                break;
            case this.DELETE:
                methodName='delete';
                break;
            case this.ALL:
                methodName='all';
                break;
            default:
                throw new Error("please check the method property");
        }
        return methodName;
    }
}