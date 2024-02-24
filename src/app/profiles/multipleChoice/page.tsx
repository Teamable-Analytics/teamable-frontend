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
import { useRef, useState } from "react"
import Navbar from "@/components/ui/navbar"
import Breadcrumbs from "@/components/ui/breadcrumbs"
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove } from "@dnd-kit/sortable"
import { DndContext, closestCenter } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { Formik, Form, Field, FieldArray, FieldArrayRenderProps } from 'formik'

type Answer = {
    id: number
    label: string
}

const SortableInput = ({answer, index, answers, setAnswers, arrayHelpers, setFieldValue}: {answer: Answer, index: number, answers: Answer[], setAnswers: any, arrayHelpers: FieldArrayRenderProps, setFieldValue: any}) => {
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
                            <Field name={`answers.${index}`} type="text" placeholder="" value={answer.label} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" onChange={(e: any) => {
                                answer.label = e.target.value
                                setAnswers(answers.map(el => {
                                    return el.id === answer.id ? answer : el
                                }))
                                setFieldValue(`answers.${index}`, e.target.value)
                            }} />
                        </div>
                        <Button className="col-span-2" onClick={() => {
                            setAnswers(answers.filter(el => {
                                return el.id !== answer.id
                            }))
                            arrayHelpers.remove(index)
                        }}>Delete</Button>
                        <Button className="col-span-1" ref={setNodeRef} {...listeners}>Drag</Button>
                    </>
                    :
                    <>
                        <div className="col-span-8">
                            <Field name={`answers.${index}`} type="text" placeholder="" value={answer.label} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" onChange={(e: any) => {
                                answer.label = e.target.value
                                setAnswers(answers.map(el => {
                                    return el.id === answer.id ? answer : el
                                }))
                                setFieldValue(`answers.${index}`, e.target.value)
                            }} />
                        </div>
                    </>
                }
            </div>
        </div>
    )
}


const  Home = () => {
    const ArrayHelperRef = useRef<FieldArrayRenderProps>()
    const [questionText, setQuestionText] = useState('What is your favorite color?')
    const [answers, setAnswers] = useState<Answer[]>([{id: 1, label: ''}])

    const onDragEnd = (event: any) => {
        const {active, over} = event
        if (active.id === over.id) {
            return
        }

        const oldIndex = answers.findIndex((answer) => answer.id === active.id)
        const newIndex = answers.findIndex((answer) => answer.id === over.id)
        
        if (ArrayHelperRef.current) {
            ArrayHelperRef.current.move(oldIndex, newIndex);
        }

        setAnswers((answers) => {
            return arrayMove(answers, oldIndex, newIndex)
        })
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
                    <Card>
                        <br></br>
                        <Formik
                            initialValues={{ question: "", answers: [] }}
                            onSubmit={async (values) => {
                                await new Promise((resolve) => setTimeout(resolve, 500));
                                alert(JSON.stringify(values, null, 2));
                            }}
                        > 
                        {({
                            setFieldValue
                        }) => (
                            <Form>
                                <CardContent>
                                    <div>
                                        <Label>Question Text</Label>
                                        <Field name="question" type="text" placeholder="" value={questionText} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" onChange={(e: any) => {
                                            setQuestionText(e.target.value)
                                            setFieldValue(e.target.name, e.target.value)
                                        }} />
                                    </div>
                                    <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
                                        <FieldArray
                                            name="answers"
                                            render={arrayHelpers => {
                                                ArrayHelperRef.current = arrayHelpers
                                                return (
                                                <SortableContext items={answers} strategy={verticalListSortingStrategy}>
                                                    {answers.map((answer, index) => (
                                                        <SortableInput key={answer.id} answer={answer} index={index} answers={answers} setAnswers={setAnswers} arrayHelpers={arrayHelpers} setFieldValue={setFieldValue} />
                                                    ))}
                                                </SortableContext>
                                                )
                                            }}>
                                        </FieldArray>
                                        {/* <SortableContext items={answers} strategy={verticalListSortingStrategy}>
                                            {answers.map((answer, index) => (
                                                <SortableInput key={answer.id} answer={answer} index={index} answers={answers} setAnswers={setAnswers} setFieldValue={setFieldValue} />
                                            ))}
                                        </SortableContext> */}
                                    </DndContext>
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    <Button type="button" onClick={() => {
                                        setAnswers([...answers, {id: answers.length + 1, label: ''}])
                                    }}>Add Answer</Button>
                                    <Button type="submit" onClick={() => {
                                    }}>Save Question</Button>
                                </CardFooter>
                            </Form>
                            )}
                        </Formik>
                    </Card>

                    {/* VIEWER */}
                    <Card>
                        <CardHeader>
                            <CardTitle>{questionText}</CardTitle>
                        </CardHeader>
                        <RadioGroup>
                            {answers.map((answer) => (
                                <CardContent>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value={'' + answer.id} id={'' + answer.id} />
                                        <Label htmlFor={'' + answer.id}>{answer.label}</Label>
                                    </div>
                                </CardContent>
                            ))}
                        </RadioGroup>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default Home
