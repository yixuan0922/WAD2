<template>

    <div class="page-loader">
        <div class="cup">
            <div class="handle"></div>
        </div>
    </div>

</template>
<script>
export default {
    data: () => {
        return {
            isloaded: false
        }
    },
    mounted() {
        document.onreadystatechange = () => {
            if (document.readyState == "complete") {
                this.isloaded = true;
            }
        }
    }
}

</script>

<style>
.page-loader {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #fffdd0;
    z-index: 999;
}

.cup {
    height: 140px;
    width: 180px;
    border: 6px solid #fffdd0 ;
    position: absolute;
    top: 40%;
    left: 40%;
    border-radius: 0px 0px 70px 70px;
    background:url("@/assets/coffee.png") ;
    box-shadow: 0px 0px 0px 6px gray;
    background-repeat: repeat-x;
    background-position: 0px 140px;
    animation: fill 3s infinite;
}

@keyframes fill {
    0% {
        background-position: 0px 140px;
    }
    20% {
        background-position: -450px 100px;
    }
    40% {
        background-position: -900px 50px;
    }
    80% {
        background-position: -1350px -40px;
    }
    100% {
        background-position: 0px 140px;
    }
}

.handle {
    height: 70px;
    width: 40px;
    background-color: transparent;
    border: 6px solid gray;
    position: relative;
    left: 186px;
    top: 10px;
    border-radius: 0px 25px 80px 0px;
}

</style>
