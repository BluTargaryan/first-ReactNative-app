import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React,{useState} from 'react'
import { SafeAreaView } from 'react-native'

import {Link, router} from 'expo-router'

import {images} from '../../constants'
import CustomFormField from '../../components/CustomFormField'
import CustomButton from '../../components/CustomButton'

import {createUser} from '../../lib/appwrite'


const SignUp = () => {
  const {setUser, setIsLoggedIn} = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
const [form, setForm] = useState({
  username:'',
  email:'',
  password:''
})

const submit = async () => {
if(!form.username || !form.email || !form.password){
  Alert.alert('Error', 'Please fill in all the fields')
}

setIsSubmitting(true)

try {
  const result = await createUser(form.email, form.password, form.username)
  setUser(result)
setIsLoggedIn(true)

  router.replace('/home')
} catch (error) {
  Alert.alert('Error', error.message)
}finally{
  setIsSubmitting(false)
}

  
};

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Image 
          source={images.logo}
          resizeMode='contain'
          className='w-[115px] h-[35px]'/>

<Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Sign Up to Aora
          </Text>

          <CustomFormField
          title="Username"
          value={form.username}
          handleChangeText = {(e)=>setForm({
            ...form,
            username:e
          })}
          otherStyles="mt-10"
          />
          <CustomFormField
          title="Email"
          value={form.email}
          handleChangeText = {(e)=>setForm({
            ...form,
            email:e
          })}
          otherStyles="mt-7"
          keyboardType="email-address"
          />
          <CustomFormField
          title="Password"
          value={form.password}
          handleChangeText = {(e)=>setForm({
            ...form,
            password:e
          })}
          otherStyles="mt-7"
          />

          <CustomButton 
          title="Sign Up"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
<Text className="text-lg text-gray-100 font-pregular">
Have an account alreadyy?
</Text>

<Link href='/sign-in'
className='text-lg font-semibold text-secondary'>
Sign In
</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp