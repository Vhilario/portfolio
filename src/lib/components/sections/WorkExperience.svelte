<script lang="ts">
    import * as Avatar from "$lib/components/ui/avatar/index.js";
    import { Separator } from "$lib/components/ui/separator/index.js";
</script>

<section class="relative mx-auto max-w-3xl px-4 space-y-8">
    <h1 class="mb-8 text-3xl md:text-4xl font-bold">Work Experience:</h1>
    
    <div class="relative">
        <div class="absolute left-6 top-0 bottom-0 w-0.5 bg-border"></div>
        
        <div class="space-y-8">
            <div class="relative flex items-start gap-4">
                <div class="relative z-10 flex-shrink-0">
                    <Avatar.Root class="w-12 h-12 border-2">
                        <Avatar.Image src="/tranelogo.png" alt="Company Icon" />
                        <Avatar.Fallback>Trane</Avatar.Fallback>
                    </Avatar.Root>
                </div>
                
                <div class="flex-1 pt-1">
                    <h2 class="text-xl md:text-2xl font-bold">Software Test Engineer</h2>
                    <p class="text-sm text-muted-foreground">2024 - Present</p>
                    <p class="mt-2 text-muted-foreground text-sm md:text-base">Conducted comprehensive integration testing for Trane Link systems and developed automated test frameworks to improve efficiency and coverage. Applied software development expertise to create robust automation solutions for complex testing scenarios.</p>
                </div>
            </div>
            
            <div class="relative flex items-start gap-4">
                <div class="relative z-10 flex-shrink-0">
                    <Avatar.Root class="w-12 h-12 border-2">
                        <Avatar.Image src="/tranelogo.png" alt="Company Icon" />
                        <Avatar.Fallback>Trane</Avatar.Fallback>
                    </Avatar.Root>
                </div>
                
                <div class="flex-1 pt-1">
                    <h2 class="text-xl md:text-2xl font-bold">Software Engineer Intern</h2>
                    <p class="text-sm text-muted-foreground">2023 - 2024</p>
                    <p class="mt-2 text-muted-foreground text-sm md:text-base">Developed file compression system for embedded environments, built pages for the Trane Diagnostics React-Native app. Collaborated with Controls team to implement new features and delivered performant code for Trane's production software stack.</p>
                </div>
            </div>
            
        </div>
    </div>
</section>