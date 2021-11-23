function addElements(of, items) {

    let stack = [];

    for (const property in items) {
        const div_element = document.createElement("div")
        const span_element = document.createElement("span")
        div_element.innerText = `${property}:::`
        span_element.style = "color:yellow;background-color:red"
        span_element.id = `${property}`
        span_element.innerText = items[property]
        stack.push(span_element)
        stack.push(div_element)
    }

    of.after("<br><br>")

    while (stack.length !== 0) {
        const divElement = stack.pop();
        divElement.append(stack.pop())
        of.after(divElement)
    }

    stack = null;
}

$(document).on('click', '#outboundBtn', function () {
    console.log("dou")
    $.ajax({
        url: '/coupang/qry/outbound',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            console.log(`POST : /coupang/qry/outbound`)
            $('#outbound-result').text(JSON.stringify(data, null, 2))

            addElements($('#outbound-result'), {
                deliveryCode: data.content[0].remoteInfos[0].deliveryCode,
                outboundShippingPlaceCode: data.content[0][`outboundShippingPlaceCode`]
            })

            console.log(`SUCCESS`)
        }
    })
})

$(document).on('click', '#rscBtn', function () {
    $.ajax({
        url: '/coupang/qry/rsc',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            console.log(`POST : /coupang/qry/rsc`)
            $('#rsc-result').text(JSON.stringify(data, null, 2))

            addElements($('#rsc-result'), {
                returnCenterCode: data.data.content[0].returnCenterCode,
                returnChargeName: data.data.content[0].shippingPlaceName,
                companyContactNumber: data.data.content[0].placeAddresses[0].companyContactNumber,
                returnZipCode: data.data.content[0].placeAddresses[0].returnZipCode,
                returnAddress: data.data.content[0].placeAddresses[0].returnAddress,
                returnAddressDetail: data.data.content[0].placeAddresses[0].returnAddressDetail,
            })

            console.log(`SUCCESS`)
        }
    })
})