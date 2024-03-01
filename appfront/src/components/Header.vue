<template>
	<div class="es-screen-header">
		<div class="es-screen-header-title">{{ '南京市商业服务设施选址平台' }}</div>
		<!-- <div class="es-screen-header-right">
			<span class="datetime">{{ currentTime }}</span>
		</div> -->
	</div>
</template>

<script setup lang='ts'>
import {  onBeforeUnmount, ref } from 'vue'
import dayjs from 'dayjs'


const currentTime = ref('')
const timeId = ref()

function startTime() {
	timeId.value = setTimeout(() => {
		currentTime.value = dayjs().format('YYYY-MM-DD HH:mm:ss')
		startTime()
	}, 1000)
}
onBeforeUnmount(() => {
	clearTimeout(timeId.value)
})

startTime()
</script>

<style lang='scss' scoped>
.es-screen-header {
  z-index: 1000; /* 确保 el-input 显示在地图之上 */
	position: relative;
	width: 100%;
	height: 40px;
  background-color:  rgba(239, 239, 239, 0.1);
	background-size: 100% 100%;
	background-repeat: no-repeat;
	animation: fade 3s;
	&-title {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 487px;
		height: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 30px;
		font-weight: 500;
		letter-spacing: 7px;
		text-shadow: 0px 2px 20px rgba(222,171,155,0.6);
	}
	.es-screen-logo {
		display: flex;
    align-items: center;
		height: calc(40px - 20px);
	}
	&-right {
		display: flex;
    align-items: center;
    position:absolute;
    right: 0px;
    top: 50%;
    transform: translateY(-80%);
		img {
			width: 30px;
			margin-right: 16px;
			cursor: pointer;
			transition: .3s cubic-bezier(.175,.885,.32,1.275);
			&:hover {
				transform: scale(1.2);
			}
		}
	}
}

@keyframes fade {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}
</style>