var vm = new Vue({
    el: '#app',
    data: {
        items: [],
        selected: 0,
        isMain: true,
        newTodo: ''
    },
    methods: {
        switchCompleted: function (index) {
            this.items[index].isComplete = !this.items[index].isComplete;
            axios.get('/switch', {
                params: {
                    id: this.items[index].id
                }
            })
                .then(function (response) {
                    console.log(response);

                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        select: function (index) {
            this.items[index].selected = !this.items[index].selected;
            this.selected += this.items[index].selected + this.items[index].selected;
            this.selected--;
        },
        del: function () {
            console.log(1);
            deleted = 0;
            to_delete = [];
            for (key in this.items) {
                if (this.items[key].selected == 1) {
                    to_delete.push(key);
                }
            }
            for (index in to_delete) {
                axios.get('/delete', {
                    params: {
                        id: this.items[to_delete[index] - deleted].id
                    }
                })
                    .then(function (response) {
                        console.log(response);

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                this.items.splice(to_delete[index] - deleted, 1);
                deleted++;
                this.selected--;
            }
        },
        ch: function () {
            this.isMain = !this.isMain;
        },
        addt: function () {
            if (this.newTodo) {
                axios.get('/add', {
                    params: {
                        text: this.newTodo
                    }
                })
                    .then(function (response) {
                         addNew(response.data.dict);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                this.newTodo = '';
                this.isMain = !this.isMain;
            }
        }
    }
});

function addNew(dict) {
    vm.items.push(dict);
}


function update() {
    axios.get('/list/')
        .then(function (response) {
            for (i in response.data.list) {
                response.data.list[i].selected = false
            }
            vm.items = response.data.list;
        })
        .catch(function (error) {
            console.log(error);
        });
}

update();