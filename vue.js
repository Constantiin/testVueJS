const returnCarObj = (name, model, year, image, owner, phone, ruName = '', ruModel) => {
    return {
        name, model, year, image, owner, phone, ruName, ruModel
    }
}

const generateLogs = (text, type, date = new Date()) => {return {text, type, date}}

let arrCars = [
    returnCarObj('BMW', 'X5', '2018', 'images/BMW.jpg', 'Иван', '+7-999-888-77-66', 'бмв', 'х5'),
    returnCarObj('Chevrolet', 'Camaro', '2017', 'images/Chevrolet.jpg', 'Николай', '+7-999-555-44-33', 'шевроле', 'камаро'),
    returnCarObj('Mitsubishi', 'Lancer', '2016', 'images/Mitsubishi.jpg', 'Григорий', '+7-999-333-22-11', 'митсубиси', 'лансер')
];

let vue = new Vue ({
    
    el: '#vue',
    
    data: {
        cars: arrCars,
        activeCar: arrCars[0],
        logs: [],
        selectedCarIndex: 0,
        visibilityPhone: false,
        visibilityModal: false,
        search: ''
    },
    
    methods: {
        selectCar (index) {
            this.activeCar = this.filteredCars[index]
            this.selectedCarIndex = index
            this.visibilityPhone = false
        },
        newOrder () {
            this.visibilityModal = false
            this.logs.unshift(
                generateLogs (`Ваш заказ подтверждён: ${this.activeCar.name} - ${this.activeCar.model}`, 'ok')
            )
        },
        cancelOrder () {
            this.visibilityModal = false
            this.logs.unshift(
                generateLogs (`Ваш заказ отменён: ${this.activeCar.name} - ${this.activeCar.model}`, 'cnl')
            )
        },
    },

    computed: {
        phoneBtnText () {
            return this.visibilityPhone ? 'Скрыть телефон продавца' : 'Показать телефон продавца'
        },
        filteredCars () {
            return this.cars.filter(car => {
                let carNameUpper = car.name.toUpperCase()
                let carRuNameUpper = car.ruName.toUpperCase()
                let carModelUpper = car.model.toUpperCase()
                let carRuModelUpper = car.ruModel.toUpperCase()
                let searchUpper = this.search.toUpperCase()
                return carNameUpper.indexOf(searchUpper) > -1 || 
                       carRuNameUpper.indexOf(searchUpper) > -1 || 
                       carModelUpper.indexOf(searchUpper) > -1 ||
                       carRuModelUpper.indexOf(searchUpper) > -1
            })            
        }
    },

    filters: {
        formattedDate (value) {
            return value.toLocaleString()
        }
    }
})