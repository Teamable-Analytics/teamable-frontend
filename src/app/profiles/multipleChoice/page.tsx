'use client'

import {Button} from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useReducer, useState } from "react"
import Navbar from "@/components/ui/navbar"
import Breadcrumbs from "@/components/ui/breadcrumbs"
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove } from "@dnd-kit/sortable"
import { DndContext, closestCenter } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'

interface Answer {
    id: number
    label: string
}

const SortableItem = ({answer}: {answer: Answer}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id: answer.id})

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    }

    return (
        <CardContent ref={setNodeRef} style={style} {...attributes} {...listeners} >
            <div className="flex items-center space-x-2">
                <RadioGroupItem value={'' + answer.id} id={'' + answer.id} />
                <Label htmlFor={'' + answer.id}>{answer.label}</Label>
            </div>
        </CardContent>
    )
}

const  Home = () => {
    const [questionName, setQuestionName] = useState('')
    const [questionText, setQuestionText] = useState('What is your favorite color?')
    const [answers, setAnswers] = useState<Answer[]>([{id: 1, label: ''}])
    const [, forceUpdate] = useReducer(x => x + 1, 0)

    const onDragEnd = (event: any) => {
        const {active, over} = event

        if (active.id === over.id) {
            return
        }

        setAnswers((answers) => {
            const oldIndex = answers.findIndex((answer) => answer.id === active.id)
            const newIndex = answers.findIndex((answer) => answer.id === over.id)
            return arrayMove(answers, oldIndex, newIndex)
        })
    }

    const SortableInput = ({answer, index}: {answer: Answer, index: number}) => {
        const {
            attributes,
            listeners,
            setNodeRef,
            transform,
            transition,
        } = useSortable({id: answer.id})

        const style = {
            transition,
            transform: CSS.Transform.toString(transform),
        }

        return (
            <div key={index} style={style} {...attributes}>
                <br></br>
                <Label>Answer {index + 1}</Label>
                <div className="grid grid-cols-8 gap-3">
                    { answers.length > 1 ?
                        <>
                            <div className="col-span-5">
                                <Input type="text" placeholder="" value={answer.label} onChange={(e) => {
                                    answer.label = e.target.value
                                    forceUpdate()
                                }} />
                            </div>
                            <Button className="col-span-2" onClick={() => {
                                setAnswers(answers.filter(el => {
                                    return el.id !== answer.id
                                }))
                            }}>Delete</Button>
                            <Button className="col-span-1" ref={setNodeRef} {...listeners}>Drag</Button>
                        </>
                        :
                        <>
                            <div className="col-span-8">
                                <Input type="text" placeholder="" value={answer.label} onChange={(e) => {
                                    answer.label = e.target.value
                                    forceUpdate()
                                }} />
                            </div>
                        </>
                    }
                </div>
            </div>
        )
    }

    return (
        <>
            <Navbar></Navbar>

            <Breadcrumbs pages={["Home", "Page", "Profiles", "Multiple Choice"]}></Breadcrumbs>

            <div className="container py-5">
                <span className="text-4xl font-bold">Profiles</span>
            </div>

            <div className="container mx-auto">

                {/* EDITOR */}
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <Card>
                            <br></br>
                            <CardContent>
                                <div>
                                    <Label>Name</Label>
                                    <Input type="text" placeholder="" onChange={(e) => {
                                        setQuestionName(e.target.value)
                                    }}/>
                                </div>
                                <br></br>
                                <div>
                                    <Label>Question Text</Label>
                                    <Input type="text" placeholder="" value={questionText} onChange={(e) => {
                                        setQuestionText(e.target.value)
                                    }}/>
                                </div>
                                <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
                                    <SortableContext items={answers} strategy={verticalListSortingStrategy}>
                                        {answers.map((answer, index) => (
                                            <SortableInput key={answer.id} answer={answer} index={index} />
                                        ))}
                                    </SortableContext>
                                </DndContext>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button onClick={() => {
                                    setAnswers([...answers, {id: answers.length + 1, label: ''}]); forceUpdate()
                                }}>Add Answer</Button>
                                <Button onClick={() => {
                                }}>Save Question</Button>
                            </CardFooter>
                        </Card>
                    </div>

                    {/* VIEWER */}
                    <Card>
                        <CardHeader>
                            <CardTitle>{questionText}</CardTitle>
                            <CardDescription>The order of answers can be changed by drag and dropping</CardDescription>
                        </CardHeader>
                        <RadioGroup>
                            <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
                                <SortableContext items={answers} strategy={verticalListSortingStrategy}>
                                    {answers.map((answer) => (
                                        <SortableItem key={answer.id} answer={answer} />
                                    ))}
                                </SortableContext>
                            </DndContext>
                        </RadioGroup>
                    </Card>

                </div>
            </div>
        </>
    )
}

export default Home
