# Trabalho Prático AEDS III – TP4

**Integrantes**  
- Enzo  
- Gabriel Xavier  
- Pedro Tinoco  
- Vitor de Meira  

## O que o trabalho faz?  
Neste quarto trabalho prático da disciplina de AEDS III, implementamos uma Tabela Hash Extensível com visualização interativa. A estrutura permite inserção, busca e remoção de valores, além de operações como divisão de buckets e duplicação do diretório. A interface gráfica facilita a compreensão do funcionamento interno da tabela, exibindo os buckets, seus valores e a profundidade global/local.

- Estrutura de dados **Tabela Hash Extensível** com suporte a:
  - Inserção de valores  
  - Busca de valores  
  - Remoção de valores  
  - Divisão de buckets quando cheios  
  - Duplicação do diretório quando necessário  
- Interface interativa para visualização e manipulação da tabela.  
- Implementação em **JavaScript**, com uso de **HTML** e **CSS** para a interface.  

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
