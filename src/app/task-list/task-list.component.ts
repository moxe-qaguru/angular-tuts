import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { ActivatedRoute, Route } from '@angular/router'

@Component({
    selector: 'app-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
    date: Date = new Date()
    newTaskTitle: string = ''
    constructor(private route: ActivatedRoute) {}
    ngOnInit(): void {
        this.date = new Date(this.route.snapshot.params['date'])
        console.log(this.date.toLocaleDateString())
    }

    tasks: Task[] = [
        new Task('Check the board'),
        new Task('Test Task'),
        new Task('Mark Task as done'),
    ]

    addItem(taskNgForm: NgForm) {
        if (taskNgForm.touched == false) return

        if (taskNgForm.valid == false) return
        this.tasks.push(new Task(this.newTaskTitle))
        taskNgForm.reset({ date: this.date })
    }

    removeItem(item: Task) {
        const isRemovalConfrimed = confirm(
            `Are you sure you want to remove "${item.title}" from the list?`
        )

        if (isRemovalConfrimed) {
            this.tasks = this.tasks.filter((task) => task != item)
        }
    }
}

class Task {
    constructor(public title: string) {}
    isDone = false

    toggleDoneStatus() {
        this.isDone = !this.isDone
    }
}
