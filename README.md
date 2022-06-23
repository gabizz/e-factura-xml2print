
## Utilitar 100% gratuit pentru conversia fișierelor XML e-Factura (ro) în format "uman", tipăribil

  

## De ce?

  Începând cu 01.07.2022, în România s-a instituit obligativitatea emiterii facturilor în relația B2G (bussines-to-government) prin sistemul e-factura. (și pentru o serie de alte categorii de tranzacții comerciale)
  
Astfel, o factură trimisă de Dvs. unei instituții prin SPV, secțiunea e-Factura va fi transmisă automat acesteia prin sistemul de raportare contabilă, ForexeBug.

Din păcate, în sistemul Forexebug, instituțiile primesc DOAR fișierul XML aferent facturii Dvs., neexistând posibilitatea de a-l converti automat în "ceva" printabil. Astfel, contabilul instituției va trebui să descarce fișierul XML și apoi să-l "treacă" printr-un utilitar de conversie în PDF (scris în Java, disponibil [aici](https://mfinante.gov.ro/static/10/eFactura/GenerareFactura_10112021.zip) ). Acesta generează, într-adevăr, un fișier PDF (foarte urât și cu 3 pagini pentru fiecare factură)


    Utilitarul de față adresează EXACT acestă problemă! 
    Oferă un mod simplu și direct în orice browser web 
    de a converti XML-ul e-Factura într-un format 
    "uman", tipăribil, fără a mai instala nimic suplimentar 
    pe calculatorul Dvs!

<center>* * *

<center>Mulțumită vercel.com, vă punem la dispoziție acest utilitar, compilat, "gata de folosire" la următoarea adresă:
<h3 align="center">https://efactura.gmaftei.ro</h3>

---
Dacă doriți să contribuiți la dezvoltarea acestui proiect Next.js

    git clone git@github.com:gabizz/hestiacp-scriptline-generator.git
    yarn 
    yarn dev  
    sau 
    yarn build 

Și asta pentru că **ANAF** a gândit și sistemul **e-Factura** așa cum știe cel mai bine, dintotdeauna: 
- cu **ZERO** preocupare pentru ergonomie
- cu **ZERO** preocupare pentru experiența contribuabilului

De ce fac asemenea afirmații legate de o respectabilă agenție a Statului Român? Din următoarele motive:

- facturile în format XML pot fi încărcate prin SPV doar "una-câte-una". Ce te faci dacă ai de emis 100 sau 1000 sau 10,000 de facturi lunar?
- exemplele de facturi prezentate pe pagina ANAF e-Factura ([link pagină](https://mfinante.gov.ro/web/efactura/informatii-tehnice)) sunt preluate din alte țări, nici măcar nu se validează cu validatorul propriu al ANAF (altă aplicație JAVA, pus la dispoziție [aici](https://mfinante.gov.ro/static/10/eFactura/duk_integrator_20220530.zip))
- la prima mea experiență, trimițând prin interfața web (SPV)  "una-câte-una" 23 de facturi, am avut surpriza de a primi confirmări doar pentru 6 facturi (așa a concepută pagina lor, arată doar șase, probabil că așa s-au gândit ei, o firmă nu are mai mult de șase clienți bugetari). Totuși apelând API-ul e-Factura, primești lista întreagă...
- tot legat de transmitere. ANAF este, în toate sistemele sale de interacțiune cu contribuabilul, de-a dreptul îndrăgostit de indecși lor de încărcare! e-Factura nu face excepție. Confirmările conțin în titlul doar indexul de încărcare (nici urmă de seria și numărul facturii - informații care ar permite contribuabilului să urmărească mult mai ușor ce a transmis și ce nu...)
- suportul tehnice este discutabil (încercând să implementez exportul în XML e-Factura din aplicația web proprie de facturare și adresând întrebări pertinente, tehnice și punctuale, răspunsurile primite, sintetizând sunau ceva de genul *"scrie acolo la noi pe pagină tot, citește mai atent".* Bineînțeles că daca scria nu mai întrebam)
