<template>
  <div class="max-w-md mx-auto my-8">
    <h1 class="text-2xl font-bold mb-6">Sign Up</h1>
    
    <form class="space-y-6" @submit.prevent="signUp" @keydown="form.errors.clear()">
      <UFormGroup label="Email Address" :error="form.errors.get('uid')">
        <UInput v-model="form.email" id="email" color="gray" type="email" autocomplete="email" required />
      </UFormGroup>

      <UFormGroup label="Password" :error="form.errors.get('password')">
        <UInput v-model="form.password" id="password" color="gray" type="password" autocomplete="current-password" required />
      </UFormGroup>

      <UButton type="submit">Sign Up</UButton>
    </form>
  </div>
</template>

<script setup>
  import useForm from '~/utilities/form'

  const toast = useToast()
  const { $api } = useNuxtApp()
  const form = useForm({
    email: '',
    password: '',
  }, toast)

  const signUp = async () => {
    await form.value.post($api('/auth/sign-up'))
    toast.add({ title: 'Thanks for joining!', timeout: 6000 })
    navigateTo({ path: '/' })
  }
</script>