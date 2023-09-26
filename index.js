
let isCollapsed = false
let previousElements = []



const handleClickPreviousSearch = (event) => {
    var target = event.target || event.srcElement;

    const elementFound = previousElements.find(el => el.id === target.id)
    document.getElementById('inputName').value = elementFound.element.s
    document.getElementById('inputSelect').value = elementFound.element.t === '' ? 'Any': elementFound.element.t === ''
    document.getElementById('inputYear').value = elementFound.element.y
    document.getElementById('inputPage').value = elementFound.element.page
    document.getElementById('searchBtn').disabled = false
    
    

    
    
}

const findPreviousRequets = () => {

    
    axios.get('https://mfm2k2hmyd.execute-api.eu-west-3.amazonaws.com/prod/requests')
    .then(response => {
        const divRoot = document.getElementById('previous_requests')

        response.data.forEach((element, index) => {
            const divColumn = document.createElement('div')
            divColumn.className = 'col-md-4  col-sm-6 col-12'
            
            const span = document.createElement('span')
            span.id = `previous-search-${index}`
            span.className = 'pseudolink'
            span.innerHTML = `${index + 1}º {Name: ${element.s}, Type:${element.t === '' ? 'Any': element.t}, Year: ${element.y}, Page: ${element.page}}`
            span.onclick=handleClickPreviousSearch
            previousElements.push({id: `previous-search-${index}`, element: element})
          
            
            divColumn.appendChild(span)
            divRoot.appendChild(divColumn)
            
            

        })
        
        
        
    })

}

findPreviousRequets()

const disabledSearchButton = () => {
    const inputName = document.getElementById('inputName').value
    const searchBtn = document.getElementById('searchBtn')

    searchBtn.disabled = inputName === ''

}



const createDivAPI = (data) => {
    
    console.log(data)
    const divRoot = document.createElement('div')
    divRoot.className = 'row'
    
    
    data.Search.forEach(element => {
        
        const divColumn = document.createElement('div')
        divColumn.className = 'mt-4 col-12 col-sm-6 col-md-4 col-xl-3'
        
        
        
        const divCard = document.createElement('div')
        divCard.className = 'card'
        const imgCard = document.createElement('img')
        imgCard.src = element.Poster
        imgCard.alt = element.Title
        imgCard.className = 'img-shown'
        
        
        const divBody = document.createElement('div')
        divBody.className = 'card-body'
        
        
        const titleName = document.createElement('h5')
        titleName.className = 'card-text'
        titleName.innerHTML = `${element.Title}`
        
        
        
        
        divBody.appendChild(titleName)
        
        
        const noSortedlist = document.createElement('ul')
        noSortedlist.className = 'list-group list-group-flush'
        
        const elementList = document.createElement('li')
        elementList.className = 'list-group-item'
        elementList.innerHTML = element.imdbID
        
        const elementList2 = document.createElement('li')
        elementList2.className = 'list-group-item'
        elementList2.innerHTML = element.Type
        
        
        noSortedlist.appendChild(elementList)
        noSortedlist.appendChild(elementList2)
        
        
        
        
        
        divCard.appendChild(imgCard)
        divCard.appendChild(divBody)
        divCard.appendChild(noSortedlist)
        
        divColumn.appendChild(divCard)
        divRoot.appendChild(divColumn)
        
        
        
        
        
        
    })
    
    return divRoot
    
}

const createDivError = (error) => {
    const divError = document.createElement('div')
    divError.className = 'col-12'
    const text = document.createElement('h3')
    text.st = 'color: red;'
    text.innerHTML = error
    divError.appendChild(text)
    return divError
}

const createDivSpinner = () => {
    const divSpinnerResponsive = document.createElement('div')
    divSpinnerResponsive.className = 'col-12 text-center'
    
    const divSpinner = document.createElement('div')
    divSpinner.className = 'spinner-border'
    divSpinner.role = 'status'
    
    const spanSpinner = document.createElement('span')
    spanSpinner.className = 'visually-hidden'
    spanSpinner.innerHTML = 'Loading...'
    
    
    divSpinner.appendChild(spanSpinner)
    divSpinnerResponsive.appendChild(divSpinner)
    return divSpinnerResponsive
    
}


const onClickBtnSearch = () => {
    
    const apiKey='56ef5305'
    const url=`https://mfm2k2hmyd.execute-api.eu-west-3.amazonaws.com/prod/requests/search?`
    const inputName = document.getElementById('inputName')
    const inputSelect = document.getElementById('inputSelect')
    const inputYear = document.getElementById('inputYear')
    const inputPage = document.getElementById('inputPage')
    const searchBtn = document.getElementById('searchBtn')


    
    
    const divElements = document.getElementById('elements')
    divElements.innerHTML = ''
    
    divElements.appendChild(createDivSpinner())
    
    
    axios.get(`${url}s=${inputName.value}&t=${inputSelect.value === 'Any' ? '' : inputSelect.value}&y=${inputYear.value}&page=${inputPage.value}&apikey=${apiKey}`)
    .then(response => {

        divElements.innerHTML = ''
        searchBtn.disabled = true
        if (response.data.Response === 'True') {
            divElements.appendChild(createDivAPI(response.data))



        } else {
            divElements.appendChild(createDivError(response.data.Error))
        }
        

        const divRoot = document.getElementById('previous_requests')

    
        const divColumn = document.createElement('div')
        divColumn.className = 'col-md-4  col-sm-6 col-12'
        
        const span = document.createElement('span')
        span.id = `previous-search-${previousElements.length}`
        span.className = 'pseudolink'
        span.innerHTML = `${previousElements.length + 1}º {Name: ${inputName.value}, Type:${inputSelect.value === 'Any' ? '' : inputSelect.value}, Year: ${inputYear.value}, Page: ${inputPage.value}}`
        span.onclick=handleClickPreviousSearch
        previousElements.push({id: `previous-search-${previousElements.length}`, element: {s: inputName.value, t:inputSelect.value, y: inputYear.value, page: inputPage.value}})
      
        
        divColumn.appendChild(span)
        divRoot.appendChild(divColumn)
        inputName.value = ''
        inputSelect.value = 'Any'
        inputYear.value = ''
        inputPage.value = ''        
        

        
    })

}

const handleClickCollapse = () => {
    const btnCollapse = document.getElementById('btn-collapse')
    btnCollapse.removeAttribute("class");

    
    if (isCollapsed) {
        btnCollapse.className = 'btn btn-primary btn-sm'
        btnCollapse.innerHTML = 'Show previous searches'
        isCollapsed = false
    } else {
        btnCollapse.className = 'btn btn-danger btn-sm'
        btnCollapse.innerHTML = 'Hide previous searches'
        isCollapsed = true
    }

}