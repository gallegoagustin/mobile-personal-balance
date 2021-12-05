export const sortExpenses = (arr) => {
    let categories = [
        { category: 'Food', total: 0 },
        { category: 'Bills', total: 0 },
        { category: 'Home', total: 0 },
        { category: 'Clothes', total: 0 },
        { category: 'Self care', total: 0 },
        { category: 'Entertainment', total: 0 },
        { category: 'Others', total: 0 },
    ]
    for(let i = 0; i < arr.length; i++) {
        if(arr[i].category === 'Food') {
            categories[0].total += arr[i].total
        }
        if(arr[i].category === 'Bills') {
            categories[1].total += arr[i].total
        }
        if(arr[i].category === 'Home') {
            categories[2].total += arr[i].total
        }
        if(arr[i].category === 'Clothes') {
            categories[3].total += arr[i].total
        }
        if(arr[i].category === 'Self care') {
            categories[4].total += arr[i].total
        }
        if(arr[i].category === 'Entertainment') {
            categories[5].total += arr[i].total
        }
        if(arr[i].category === 'Others') {
            categories[6].total += arr[i].total
        }
    }
    let sorted = categories.sort((a, b) => (b.total > a.total) ? 1 : -1)
    return sorted
}