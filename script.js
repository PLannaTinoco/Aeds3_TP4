document.addEventListener('DOMContentLoaded', () => {
    // --- ELEMENTOS DA UI ---
    const valueInput = document.getElementById('value-input');
    const insertBtn = document.getElementById('insert-btn');
    const searchBtn = document.getElementById('search-btn');
    const removeBtn = document.getElementById('remove-btn');
    const clearBtn = document.getElementById('clear-btn');
    const visualizationArea = document.getElementById('visualization-area');
    const globalDepthEl = document.getElementById('global-depth');
    const statusMessageEl = document.getElementById('status-message');

    // --- PARÂMETROS DA TABELA HASH ---
    const BUCKET_SIZE = 3; // Quantos valores um bucket pode conter

    // --- CLASSES DA ESTRUTURA DE DADOS ---
    class Bucket {
        constructor(localDepth) {
            this.values = [];
            this.localDepth = localDepth;
        }

        isFull() {
            return this.values.length >= BUCKET_SIZE;
        }

        insert(value) {
            if (!this.isFull()) {
                this.values.push(value);
                return true;
            }
            return false;
        }

        remove(value) {
            const index = this.values.indexOf(value);
            if (index > -1) {
                this.values.splice(index, 1);
                return true;
            }
            return false;
        }
        
        contains(value) {
            return this.values.includes(value);
        }
    }

    class ExtendibleHashTable {
        constructor() {
            this.globalDepth = 1;
            this.directory = [new Bucket(1), new Bucket(1)];
            // O diretório aponta para os mesmos buckets inicialmente
            this.directory[0].id = 0; // Atribuir um ID para visualização
            this.directory[1] = this.directory[0]; 
            this.nextBucketId = 1;
        }

        _hash(value) {
            // Função de hash simples: pega os 'n' últimos bits do número
            // onde n = profundidade global
            return value & ((1 << this.globalDepth) - 1);
        }
        
        _getBucket(value) {
            const hash = this._hash(value);
            return this.directory[hash];
        }
        
        _getBucketIndex(value) {
            return this._hash(value);
        }

        search(value) {
            const bucket = this._getBucket(value);
            const index = this._getBucketIndex(value);
            if (bucket.contains(value)) {
                setStatus(`Valor ${value} encontrado no bucket! Índice do diretório: ${index.toString(2).padStart(this.globalDepth, '0')}.`, 'success');
                return { bucket, index };
            }
            setStatus(`Valor ${value} não encontrado.`, 'error');
            return null;
        }

        remove(value) {
            const bucket = this._getBucket(value);
            if(bucket.remove(value)) {
                setStatus(`Valor ${value} removido com sucesso.`, 'info');
                this.render();
            } else {
                setStatus(`Valor ${value} não encontrado para remoção.`, 'error');
            }
            // Simplificação: não implementamos a fusão de buckets
        }

        insert(value) {
            let bucket = this._getBucket(value);

            if (bucket.contains(value)) {
                setStatus(`Valor ${value} já existe na tabela.`, 'error');
                return;
            }

            // Se o bucket não está cheio, insere e pronto
            if (!bucket.isFull()) {
                bucket.insert(value);
                setStatus(`Valor ${value} inserido com sucesso.`, 'info');
                this.render();
                return;
            }

            // Se o bucket está cheio, a mágica acontece aqui!
            // CASO 1: Profundidade Local < Profundidade Global
            if (bucket.localDepth < this.globalDepth) {
                this._splitBucket(value, bucket);
                this.insert(value); // Tenta inserir novamente após o split
            } 
            // CASO 2: Profundidade Local == Profundidade Global
            else {
                this._doubleDirectory();
                this._splitBucket(value, bucket);
                this.insert(value); // Tenta inserir novamente após dobrar e dividir
            }
        }
        
        _splitBucket(valueToInsert, oldBucket) {
            setStatus('Bucket cheio! Realizando split...', 'action');
            
            const newBucket = new Bucket(oldBucket.localDepth + 1);
            newBucket.id = this.nextBucketId++;
            oldBucket.localDepth++;

            const oldValues = oldBucket.values;
            oldBucket.values = [];

            // Redistribui os ponteiros no diretório
            const mask = 1 << (oldBucket.localDepth - 1);
            for (let i = 0; i < this.directory.length; i++) {
                if (this.directory[i] === oldBucket) {
                    if ((i & mask) !== 0) {
                        this.directory[i] = newBucket;
                    }
                }
            }

            // Redistribui os valores antigos
            for (const val of oldValues) {
                const newHash = val & ((1 << oldBucket.localDepth) - 1);
                let targetBucketIndex = -1;
                 for (let i = 0; i < this.directory.length; i++) {
                    if ((i & ((1 << oldBucket.localDepth) - 1)) === newHash) {
                        targetBucketIndex = i;
                        break;
                    }
                }
                this.directory[targetBucketIndex].insert(val);
            }
        }

        _doubleDirectory() {
            setStatus('Profundidade Local = Global. Dobrando o diretório...', 'action');
            this.globalDepth++;
            const newDirectory = new Array(1 << this.globalDepth);
            for (let i = 0; i < this.directory.length; i++) {
                newDirectory[i] = this.directory[i];
                newDirectory[i + this.directory.length] = this.directory[i];
            }
            this.directory = newDirectory;
        }

        clear() {
            this.globalDepth = 1;
            const initialBucket = new Bucket(1);
            initialBucket.id = 0;
            this.directory = [initialBucket, initialBucket];
            this.nextBucketId = 1;
            setStatus('Tabela resetada.', 'info');
            this.render();
        }

        render() {
            visualizationArea.innerHTML = '';
            globalDepthEl.textContent = this.globalDepth;

            const dirContainer = document.createElement('div');
            dirContainer.className = 'directory';
            visualizationArea.appendChild(dirContainer);
            
            const bucketsContainer = document.createElement('div');
            bucketsContainer.className = 'buckets-container';
            visualizationArea.appendChild(bucketsContainer);

            const renderedBuckets = new Map();

            // Renderiza o diretório
            this.directory.forEach((bucket, index) => {
                const entry = document.createElement('div');
                entry.className = 'dir-entry';
                entry.innerHTML = `
                    <span class="dir-index">${index.toString(2).padStart(this.globalDepth, '0')}:</span>
                    <span class="dir-pointer">-> Bucket ${bucket.id}</span>
                `;
                dirContainer.appendChild(entry);
                
                // Marca o bucket para ser renderizado (se ainda não foi)
                if (!renderedBuckets.has(bucket.id)) {
                    renderedBuckets.set(bucket.id, bucket);
                }
            });
            
            // Renderiza os buckets únicos
            renderedBuckets.forEach(bucket => {
                const bucketEl = document.createElement('div');
                bucketEl.className = 'bucket';
                bucketEl.dataset.bucketId = bucket.id;
                
                const valuesHTML = bucket.values.map(v => `<div class="value">${v}</div>`).join('');
                
                bucketEl.innerHTML = `
                    <div class="bucket-header">
                        <span class="bucket-id">Bucket ${bucket.id}</span>
                        (ld=${bucket.localDepth})
                    </div>
                    <div class="bucket-values">
                        ${valuesHTML || '<i>Vazio</i>'}
                    </div>
                `;
                bucketsContainer.appendChild(bucketEl);
            });
        }
    }

    // --- LÓGICA PRINCIPAL E EVENTOS ---
    let ht = new ExtendibleHashTable();

    function setStatus(message, type) {
        statusMessageEl.textContent = message;
        statusMessageEl.style.color = type === 'error' ? '#dc3545' : (type === 'success' ? '#28a745' : '#333');
    }

    function handleInsert() {
        const value = parseInt(valueInput.value);
        if (isNaN(value)) {
            setStatus('Por favor, insira um número válido.', 'error');
            return;
        }
        ht.insert(value);
        valueInput.value = '';
    }

    function handleSearch() {
        const value = parseInt(valueInput.value);
        if (isNaN(value)) {
            setStatus('Por favor, insira um número válido para buscar.', 'error');
            return;
        }

        // Limpa highlights antigos
        document.querySelectorAll('.bucket.highlight').forEach(el => el.classList.remove('highlight'));
        
        const result = ht.search(value);
        if (result) {
            const bucketEl = document.querySelector(`.bucket[data-bucket-id='${result.bucket.id}']`);
            if (bucketEl) {
                bucketEl.classList.add('highlight');
            }
        }
        valueInput.value = '';
    }

    function handleRemove() {
        const value = parseInt(valueInput.value);
        if (isNaN(value)) {
            setStatus('Por favor, insira um número válido para remover.', 'error');
            return;
        }
        ht.remove(value);
        valueInput.value = '';
    }

    insertBtn.addEventListener('click', handleInsert);
    searchBtn.addEventListener('click', handleSearch);
    removeBtn.addEventListener('click', handleRemove);
    clearBtn.addEventListener('click', () => ht.clear());
    valueInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleInsert();
        }
    });

    // Renderização inicial
    ht.render();
});