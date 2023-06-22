<template>
  <div class="max-w-md mx-auto my-8">
    <h1 class="text-2xl font-bold mb-6">Sign In</h1>
    
    <form class="space-y-6" @submit.prevent="signIn" @keydown="form.errors.clear()">
      <UFormGroup label="Email Address" :error="form.errors.get('uid')">
        <UInput v-model="form.uid" id="email" color="gray" type="email" autocomplete="email" required />
      </UFormGroup>

      <UFormGroup label="Password" :error="form.errors.get('password')">
        <UInput v-model="form.password" id="password" color="gray" type="password" autocomplete="current-password" required />
      </UFormGroup>

      <UCheckbox v-model="form.rememberMe" label="Remember me" />

      <UButton type="submit">Sign In</UButton>
    </form>
  </div>
</template>

<script setup>
  import useForm from '~/utilities/form'

  const toast = useToast()
  const { $api } = useNuxtApp()
  const form = useForm({
    uid: '',
    password: '',
    rememberMe: false
  }, toast)

  const signIn = async () => {
    await form.value.post($api('/auth/sign-in'))
    toast.add({ title: 'Welcome back!', timeout: 6000 })
    navigateTo({ path: '/' })
  }
</script>