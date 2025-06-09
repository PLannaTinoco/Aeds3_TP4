# Trabalho Prático AEDS III – TP4

**Integrantes**  
- Enzo  
- Gabriel Xavier  
- Pedro Tinoco  
- Vitor de Meira  

## O que o trabalho faz?  
Neste quarto trabalho prático da disciplina de AEDS III, implementamos uma **Tabela Hash Extensível** com visualização interativa. A estrutura permite realizar operações como inserção, busca e remoção de valores, além de gerenciar automaticamente a divisão de buckets e duplicação do diretório conforme necessário. A interface gráfica foi projetada para facilitar a compreensão do funcionamento interno da tabela, exibindo os buckets, seus valores e as profundidades global e local.

### Funcionalidades principais:  
1. **Inserção de valores**  
   - O usuário pode inserir números na tabela. Caso o bucket correspondente esteja cheio, a tabela realiza automaticamente a divisão do bucket ou a duplicação do diretório, garantindo que o valor seja armazenado corretamente.  
   - A interface exibe o processo de redistribuição dos valores e a atualização dos buckets.

2. **Busca de valores**  
   - O usuário pode buscar um número na tabela. A interface destaca o bucket onde o valor está armazenado, mostrando o índice do diretório correspondente.  
   - Caso o valor não seja encontrado, uma mensagem de erro é exibida.

3. **Remoção de valores**  
   - Permite ao usuário remover um número da tabela. A interface atualiza automaticamente os buckets e o diretório após a remoção.  
   - Não implementamos a fusão de buckets após a remoção, simplificando a lógica.

4. **Divisão de buckets**  
   - Quando um bucket está cheio e sua profundidade local é menor que a profundidade global, ele é dividido em dois. Os valores são redistribuídos entre os novos buckets com base no hash recalculado.  
   - A interface exibe os novos buckets e os valores redistribuídos.

5. **Duplicação do diretório**  
   - Quando a profundidade local de um bucket atinge a profundidade global, o diretório é duplicado. Isso aumenta a capacidade da tabela para armazenar mais valores.  
   - A interface reflete a duplicação do diretório, mostrando os novos índices e os buckets associados.

6. **Reset da tabela**  
   - O botão "Limpar" permite ao usuário resetar a tabela, restaurando o estado inicial com profundidade global 1 e dois buckets vazios.  
   - A interface é atualizada para refletir o estado inicial.

7. **Visualização interativa**  
   - A interface exibe os buckets, seus valores, profundidades locais e o diretório.  
   - Os buckets são destacados durante operações como busca e inserção, facilitando a compreensão do funcionamento da tabela.  
   - A profundidade global é exibida em tempo real.

## Classes e principais métodos

### Bucket  
Representa um bucket na tabela hash.  
- **isFull()**: Verifica se o bucket está cheio.  
- **insert(value)**: Insere um valor no bucket, se houver espaço.  
- **remove(value)**: Remove um valor do bucket, se ele existir.  
- **contains(value)**: Verifica se um valor está presente no bucket.  

### ExtendibleHashTable  
Implementa a lógica da Tabela Hash Extensível.  
- **insert(value)**: Insere um valor na tabela, realizando divisão de buckets ou duplicação do diretório, se necessário.  
- **search(value)**: Busca um valor na tabela e retorna o bucket correspondente.  
- **remove(value)**: Remove um valor da tabela, se ele existir.  
- **clear()**: Reseta a tabela, restaurando o estado inicial.  
- **render()**: Atualiza a visualização da tabela na interface.  

Métodos internos:  
- **_hash(value)**: Calcula o hash de um valor com base na profundidade global.  
- **_getBucket(value)**: Retorna o bucket correspondente a um valor.  
- **_splitBucket(value, oldBucket)**: Divide um bucket cheio em dois, redistribuindo os valores.  
- **_doubleDirectory()**: Duplica o diretório quando a profundidade local de um bucket atinge a profundidade global.  

## Experiência  
A implementação do TP4 foi desafiadora e enriquecedora. Conseguimos implementar todos os requisitos, incluindo a visualização interativa da tabela. O maior desafio foi garantir que a redistribuição de valores durante a divisão de buckets fosse feita corretamente, sem perder dados ou causar inconsistências. Além disso, a lógica de duplicação do diretório exigiu atenção especial para manter a integridade da estrutura.

Os resultados foram alcançados com sucesso. A interface interativa facilita a compreensão do funcionamento da tabela, permitindo que o usuário visualize as operações realizadas em tempo real. A experiência de desenvolvimento foi positiva, reforçando nosso entendimento sobre tabelas hash extensíveis e estruturas de dados dinâmicas.

## Checklist (respostas)

- A visualização interativa da Tabela Hash Extensível foi criada?  
  **SIM**

- Há um vídeo de até 2 minutos demonstrando o uso da visualização?  
  **SIM**

- O trabalho está funcionando corretamente?  
  **SIM**

- O trabalho está completo?  
  **SIM**

- O trabalho é original e não a cópia de um trabalho de um colega?  
  **SIM**

---

Com o TP4 concluído, consolidamos nosso aprendizado sobre tabelas hash extensíveis e visualização de estruturas de dados. O esforço investido foi recompensado com um projeto funcional e didático.
