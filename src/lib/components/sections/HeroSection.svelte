<script lang="ts" module>
	//Email Form data
	import { z } from 'zod/v4'
	export const formSchema = z.object({
		name: z.string().min(1, "Name is required."),
		email: z.string().email("Please enter a valid email address."),
		message: z.string().min(10, "Message must be at least 10 characters.").max(500, "Message must be at most 500 characters."),
	});
</script>

<script lang="ts">
	import { onMount } from 'svelte'
	import { goto } from '$app/navigation'
	import gsap from "gsap"
	import { ScrollTrigger, ScrollSmoother, SplitText, ScrollToPlugin } from "gsap/all"
	import { Button } from '$lib/components/ui/button'
	import * as Dialog from '$lib/components/ui/dialog/index.js'
	import { Input } from '$lib/components/ui/input/index.js'

	import ArrowDownIcon from "@tabler/icons-svelte/icons/arrow-down"
	import BrandGithubIcon from "@tabler/icons-svelte/icons/brand-github"
	import BrandLinkedinIcon from "@tabler/icons-svelte/icons/brand-linkedin"
	import FileSmileIcon from "@tabler/icons-svelte/icons/file-smile"
	
	//Email Form things
	import { defaults, superForm } from "sveltekit-superforms";
	import { zod4 } from "sveltekit-superforms/adapters";
	import { toast } from "svelte-sonner";
	import * as Form from "$lib/components/ui/form/index.js"
	import { Textarea } from "$lib/components/ui/textarea/index.js"

	import emailjs from "@emailjs/browser"

	const form = superForm(defaults(zod4(formSchema)), {
    validators: zod4(formSchema),
    SPA: true,
    onUpdate: ({ form: f }) => {
      if (f.valid) {
        sendEmail(f.data);
      } else {
        toast.error("Please fix the errors in the form.");
      }
    }});
	const { form: formData, enhance } = form

	const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
	const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
	const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
	
	let sent = false;
	
	const sendEmail = (formData: any) => {
		emailjs
			.send(serviceId, templateId, formData, publicKey)
			.then(
				() => {
					toast.success("Email sent successfully!")
					sent = true;
				},
				(error) => {
					toast.error('Failed to send email.')
					console.error("EmailJS error:", error)
				}
			)
	}
	
	let heroSection: HTMLElement
	let mainHeading: HTMLElement
	let subHeading: HTMLElement
	let description: HTMLElement
	let ctaButton: HTMLElement
	let scrollIndicator: HTMLElement
	
	onMount(() => {
		gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, ScrollToPlugin)
		
		// Split text animations - much more subtle
		const mainSplit = new SplitText(mainHeading, {
			type: "chars, words",
			charsClass: "char",
			wordsClass: "word"
		})
		
		const subSplit = new SplitText(subHeading, {
			type: "chars, words",
			charsClass: "char",
			wordsClass: "word"
		})
		
		const descSplit = new SplitText(description, {
			type: "chars, words",
			charsClass: "char",
			wordsClass: "word"
		})
		
		// Subtle main heading animation
		gsap.fromTo(mainSplit.chars, 
			{
				y: 20,
				opacity: 0
			},
			{
				y: 0,
				opacity: 1,
				duration: 0.8,
				ease: "power2.out",
				stagger: 0.02,
				delay: 0.1
			}
		)
		
		// Subtle sub heading animation
		gsap.fromTo(subSplit.chars,
			{
				y: 15,
				opacity: 0
			},
			{
				y: 0,
				opacity: 1,
				duration: 0.6,
				ease: "power2.out",
				stagger: 0.01,
				delay: 0.8
			}
		)
		
		// Description animation
		gsap.fromTo(descSplit.words,
			{
				y: 10,
				opacity: 0
			},
			{
				y: 0,
				opacity: 1,
				duration: 0.5,
				ease: "power2.out",
				stagger: 0.05,
				delay: 1.2
			}
		)
		
		// CTA button animation
		gsap.fromTo(ctaButton,
			{
				y: 10,
				opacity: 0
			},
			{
				y: 0,
				opacity: 1,
				duration: 0.6,
				ease: "power2.out",
				delay: 1.6
			}
		)
		
		// Subtle scroll indicator animation
		gsap.to(scrollIndicator, {
			y: 5,
			duration: 2,
			ease: "power2.inOut",
			repeat: -1,
			yoyo: true,
			delay: 2
		})
		
		return () => {
			mainSplit.revert()
			subSplit.revert()
			descSplit.revert()
		}
	})
</script>

<section bind:this={heroSection} class="text-center max-w-3xl mx-auto">
	<!-- Main Heading -->
	<h1 bind:this={mainHeading} class="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight tracking-tight">
		Vincent Hilario
	</h1>
	
	<!-- Sub Heading -->
	<h2 bind:this={subHeading} class="text-xl sm:text-2xl font-medium text-muted-foreground mb-6">
		Full Stack Developer
	</h2>
	
	<!-- Description -->
	<p bind:this={description} class="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
		I build modern web applications with clean code and thoughtful design. Currently focused on creating seamless user experiences.
	</p>
	
	<!-- CTA Button -->
	<div bind:this={ctaButton} class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
		<Button size="lg" onclick={() => goto('/blog')} class="px-8 cursor-pointer">
			Read My Blog!
		</Button>
		<Dialog.Root>
			<Dialog.Trigger>
				<Button variant="outline" size="lg" class="px-8 cursor-pointer">
					Get in Touch
				</Button>
			</Dialog.Trigger>
			<Dialog.Content class="sm:max-w-[425px] my-6">
				<Dialog.Title>Contact Me</Dialog.Title>
				<Dialog.Description>
					Fill out the form below and I'll get back to you as soon as possible.
				</Dialog.Description>
				<form method="POST" class="flex flex-col gap-4 items-stretch" use:enhance>
					<Form.Field {form} name="name">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label class="text-left">Name</Form.Label>
								<Input
									{...props}
									placeholder="Enter your name"
									bind:value={$formData.name}
									disabled={sent}
								/>
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
					<Form.Field {form} name="email">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label class="text-left">Email</Form.Label>
								<Input
									{...props}
									placeholder="Enter your email address"
									bind:value={$formData.email}
									disabled={sent}
								/>
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
					<Form.Field {form} name="message">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label class="text-left">Message</Form.Label>
								<Textarea
									{...props}
									placeholder="Enter your message here..."
									class="h-[140px] resize-none"
									bind:value={$formData.message}
									disabled={sent}
								/>
								<Form.Description>
									I'll get back to you as soon as possible!
								</Form.Description>
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
					<Form.Button class="self-end" disabled={sent}>
						{!sent ? "Send Message" : "Thanks for Sending!"}
					</Form.Button>
				</form>
			</Dialog.Content>	
		</Dialog.Root>
	</div>
	
	<!-- Social Links -->
	<div class="flex justify-center items-center space-x-6 text-muted-foreground">
		<a href="https://github.com/vhilario" target="_blank" rel="noopener noreferrer" class="hover:text-foreground transition-colors">
			<BrandGithubIcon class="w-8 h-8" />
		</a>
		<a href="https://www.linkedin.com/in/vincenthilario/" target="_blank" rel="noopener noreferrer" class="hover:text-foreground transition-colors">
			<BrandLinkedinIcon class="w-8 h-8" />
		</a>
		<a href="Vincent Hilario.pdf" target="_blank" rel="noopener noreferrer" class="hover:text-foreground transition-colors">
			<FileSmileIcon class="w-8 h-8" />
		</a>
	</div>
</section>

<!-- Scroll Indicator -->
<div bind:this={scrollIndicator} class="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-muted-foreground">
	<div class="flex flex-col items-center space-y-2">
		<span class="text-sm">Scroll to explore</span>
		<ArrowDownIcon class="w-4 h-4" />
	</div>
</div>

<style>
	.char {
		display: inline-block;
	}
	
	.word {
		display: inline-block;
		margin-right: 0.25em;
	}
</style>
