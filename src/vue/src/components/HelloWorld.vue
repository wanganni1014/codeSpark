<template>
<div>
    <h1>{{ msg }}</h1>
    <button @click="count++">count is: {{ count }}</button>
</div>
</template>

<script>
export default {
    name: 'HelloWorld',
    props: {
        msg: String
    },
    data() {
        return {
            count: 0
        }
    }
}
</script>
