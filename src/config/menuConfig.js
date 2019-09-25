const menuList = [
    {
        title: 'Main page',//Menu name
        key: '/home',//corresponding path
        icon: 'home',// icon name
    },
    {
        title: 'Items',//Menu name
        key: '/items',//corresponding path
        icon: 'appstore',// icon name
        children: [
            {
                title: 'Category Manage',
                key: '/category',
                icon: 'bars',
            },
            {
                title: 'Items Manage',
                key: '/items',
                icon: 'tool',
            }
        ]
    },
    {
        title: 'User Manage',
        key: '/user',
        icon: 'user',
    },
    {
        title: 'Role Manage',
        key: '/role',
        icon: 'safety',
    },
    {
        title: 'Charts',
        key: '/charts',
        icon: 'bar-chart',
        children: [
            {
                title: 'Bar',
                key: '/charts/bar',
                icon: 'bars',
            },
            {
                title: 'Line',
                key: '/charts/line',
                icon: 'line-chart',
            },
            {
                title: 'Pie',
                key: '/charts/pie',
                icon: 'pie-chart',
            }
        ]
    }
]

export default menuList