<template>
  <div class="demo">
    <router-link to="/">Home</router-link> |
    <router-link to="/demo">Demo by Decorators</router-link> |
    <router-link to="/image">image</router-link>
    <ul class="list">
      <li class="item">
        <div class="desc">
          <h3>@Decorators.AutoCatch()</h3>
          <p>
            auto_catch 可以帮助你自动捕获 async 函数中的错误，不需要额外的 then
            catch 或是 try catch
          </p>
        </div>
        <button @click="request">catch a wrong request</button>
      </li>
      <li class="item">
        <div class="desc">
          <h3>@Decorators.Debounce() {{ test }}</h3>
          <p>在一段时间内，函数只会被调用一次。</p>
        </div>
        <button @click="debounce">debounce</button>
      </li>
      <li class="item">
        <div class="desc">
          <h3>@Decorators.Throttle()</h3>
          <p>在 wait 秒内最多执行 fn 一次的函数。</p>
        </div>
        <button @click="throttle">throttle</button>
      </li>
      <li class="item">
        <div class="desc">
          <h3>@Decorators.Delay()</h3>
          <p>每次调用函数都会延迟一段时间。</p>
        </div>
        <button @click="delay">delay</button>
      </li>
      <li class="item">
        <div class="desc">
          <h3>@Decorators.Time()</h3>
          <p>统计当前函数的执行时间。</p>
        </div>
        <button @click="time">time</button>
      </li>
      <li class="item">
        <div class="desc">
          <h3>@Decorators.Shortcuts()</h3>
          <p>
            将一个对象绑定在 Vue
            的实例下，非响应。这在非常多数据需要绑定却不想全部都放在 data
            中(无需响应)时很有用。
          </p>
        </div>
        <div>
          {{ notChangeValue }}
          <button @click="add">add value</button>
          <button @click="refresh">fouce refresh</button>
        </div>
      </li>
      <li class="item">
        <div class="desc">
          <h3>@Decorators.Deprecated()</h3>
          <p>声明一个函数将被废弃。</p>
        </div>
        <div>
          <button @click="deprecatedTestFunc">run function</button>
        </div>
      </li>
      <li class="item">
        <div class="desc">
          <h3>@Decorators.NextTick()</h3>
          <p>
            当前函数在 Vue.nextTick 内运行。具体参见
            <a href="https://cn.vuejs.org/v2/api/#Vue-nextTick" target="_blank"
              >Vue.nextTick</a
            >
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script src="./demo.js"></script>
<style scoped lang="scss">
.demo {
  .list {
    width: 600px;
    margin: 140px auto 0;
  }

  button {
    max-height: 46px;
    margin: 0 5px;
  }

  .item {
    width: 100%;
    display: flex;
    justify-content: space-between;
    background: #f5f3f3;
    padding: 10px;
    margin-bottom: 20px;
  }

  .desc {
    display: flex;
    max-width: 50%;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }
}
</style>
