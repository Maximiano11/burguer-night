<template>
  <div>
    <header
      style="
        background-color: #333;
        color: white;
        padding: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      "
    >
      <h1>Burger Night - Gerenciamento de Pedidos</h1>
      <nav>
        <router-link to="/atendimento" class="nav-link"
          >Atendimento</router-link
        >
        <router-link to="/cozinha" class="nav-link">Cozinha</router-link>
        <router-link to="/despachante" class="nav-link"
          >Despachante</router-link
        >
      </nav>
    </header>
    <main style="padding: 20px">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {};
</script>

<style>
.nav-link {
  color: white;
  margin: 0 10px;
  text-decoration: none;
  font-weight: bold;
}
.nav-link.router-link-exact-active {
  text-decoration: underline;
}
</style>
