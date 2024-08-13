"use client";

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomInput from './ui/CustomInput';
import { authFormSchema } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getLoggedInUser, signIn, signUp } from '@/lib/actions/user.action';

const AuthForm = ({ type }: { type: string }) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const formSchema = authFormSchema(type);

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        try {
            if (type === 'sign-up') {
                const newUser = await signUp(data);
                setUser(newUser);
            }
            if (type === 'sign-in') {
                const response = await signIn({
                    email: data.email,
                    password: data.password,
                });
                if (response) router.push('/')
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <section className="auth-form">
            <header className="flex flex-col gap-5 md:gap-8">
                <Link href="/" className="cursor-pointer flex items-center gap-1">
                    <Image
                        src="/icons/logo.svg"
                        width={34}
                        height={34}
                        alt="NexusOnyx Logo"
                    />
                    <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">NexusOnyx</h1>
                </Link>
                <div className="flex flex-col gap-1 md:gap-3">
                    <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
                        {user
                            ? 'Link Account'
                            : type === 'sign-in'
                                ? 'Sign In'
                                : 'Sign Up'
                        }
                    </h1>
                    <p className="text-16 font-normal text-gray-600">
                        {user
                            ? 'Link your account to get started '
                            : 'Please enter your details'
                        }
                    </p>
                </div>
            </header>
            {user ? (
                <div className="flex flex-col gap-4">
                    {/* PlaidLink */}
                </div>
            ) : (
                <>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {type === 'sign-up' && (
                                <>
                                    <div className="flex gap-4">
                                        <CustomInput form={form.control}
                                            label="First Name" name="firstName"
                                            placeholder="Enter Your First Name"
                                        />
                                        <CustomInput form={form.control}
                                            label="Last Name" name="lastName"
                                            placeholder="Enter Your Last Name"
                                        />
                                    </div>
                                    <CustomInput form={form.control}
                                        label="Address" name="address1"
                                        placeholder="Enter Your specific address"
                                    />
                                    <CustomInput form={form.control}
                                        label="City" name="city"
                                        placeholder="Enter Your specific City"
                                    />
                                    <div className="flex gap-4">
                                        <CustomInput form={form.control}
                                            label="State" name="state"
                                            placeholder="ex: Indonesia"
                                        />
                                        <CustomInput form={form.control}
                                            label="Postal Code" name="postalCode"
                                            placeholder="ex: 11101"
                                        />
                                    </div>
                                    <div className="flex gap-4">
                                        <CustomInput form={form.control}
                                            label="Date of Birth" name="dateOfBirth"
                                            placeholder="YYYY-MM-DD"
                                        />
                                        <CustomInput form={form.control}
                                            label="SSN" name="ssn"
                                            placeholder="ex: 1234"
                                        />
                                    </div>
                                </>
                            )}
                            <CustomInput form={form.control}
                                label="Email" name="email"
                                placeholder="Enter Your email"
                            />
                            <CustomInput form={form.control}
                                label="Password" name="password"
                                placeholder="Enter Your Password"
                            />
                            <div className="flex flex-col gap-4">
                                <Button type="submit" className="form-btn" disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <Loader2 size={20} className="animate-spin" /> &nbsp;
                                            Loading...
                                        </>
                                    ) : type === 'sign-in' ? 'Sign-In' : 'Sign Up'}
                                </Button>
                            </div>
                        </form>
                    </Form>
                    <footer className="flex justify-center gap-1">
                        <p className="text-14 font-normal text-gray-600">
                            {type === 'sign-in' ? "Don't have an account?" : "Already have an account?"}
                        </p>
                        <Link
                            className="form-link"
                            href={type === 'sign-in' ? '/sign-up' : '/sign-in'}
                        >
                            {type === 'sign-in' ? 'Sign Up' : 'Sign In'}
                        </Link>
                    </footer>
                </>
            )}
        </section>
    )
}

export default AuthForm