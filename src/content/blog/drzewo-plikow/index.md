---
title: 'Drzewo plików'
pubDate: 2016-03-02
tags: ["js", "files", "php", "tree"]
---

Jakiś czas temu potrzebowałem wyświetlić na stronie drzewo katalogów z plikami. Coś ładnego i praktycznego. Po przeglądnięciu kilku stron w internecie stwierdziłem, że jest średnio w tym temacie. Najczęściej spotyka się na przypał udzielane odpowiedzi, które do niczego się nie nadają. Domu murowanego jak w powiedzeniu nie mam, dzieci nie mam, ale takim drzewem spokojnie możemy się zająć.

<!--more-->

Poniżej zajmiemy się wyświetleniem listy UL zawierającą katalogi i pliki. Jest to gotowy przepis, który jak to mawiają Amerykañscy naukowcy - może się komuś przyda, a może nie.

Do pobrania struktury katalogów wykorzystamy <a href="http://www.php.net/manual/en/class.directoryiterator.php">DirectoryIterator</a>, a dokładniej przepis ze strony: <a href="http://stackoverflow.com/questions/952263/deep-recursive-array-of-directory-structure-in-php">http://stackoverflow.com/questions/952263/deep-recursive-array-of-directory-structure-in-php</a>.

<pre><code class="language-php">
$fileData = fillArrayWithFileNodes( new DirectoryIterator( '.' ) );

function fillArrayWithFileNodes( DirectoryIterator $dir )
{
	$data = array();
	foreach ( $dir as $node )
	{
		if ( $node->isDir() && !$node->isDot() )
		{
			$data[$node->getFilename()] = fillArrayWithFileNodes( new DirectoryIterator( $node->getPathname() ) );
		}
		else if ( $node->isFile() )
		{
			$data[] = $node->getFilename();
		}
  	}
  	return $data;
}
</code></pre>

Kod w powyższej postaci nie będzie dla nas zbytnio użyteczny, bo daje nam za mało informacji. Zresztą wypisz sobie wynik za pomocą <strong>print_r($fileData)</strong> by zobaczyć, że jest mizernie.

Tablicę plików, które przeczytamy w PHP musimy potem wyświetlić za pomocą js. Aby łatwiej nam się potem pracowało potrzeba nam dodatkowych informacji takich jak typ, adres do pliku oraz nazwa pliku. Dodatkowo przyda nam się tablica <strong>$ignore</strong>, która zawiera nazwy katalogów i plików które trzeba pominąć.

<pre><code class="language-php">
&lt;?php
$ignore = Array('pornoFolder'); //tego nie chcemy wyświetlać :)

function fillArrayWithFileNodes( DirectoryIterator $dir )
{
    global $ignore;

    $data = array();
    foreach ( $dir as $node )
    {
        if (in_array($node, $ignore)) continue;

        if ( $node->isDir() && !$node->isDot() )
        {
            $path = $node->getPath();
			$path = $path .'\\'. $node->getFilename();
            $path = str_replace("\\", '/', $path);

            $data[$node->getFilename()] = array(
                    'type' => 'folder',
                    'name' => $node->getFilename(),
                    'path' => $path,
                    'files' => fillArrayWithFileNodes( new DirectoryIterator( $node->getPathname() ) )
            );
        }
        else if ( $node->isFile() && !$node->isDot() )
        {
            $path = $node->getPath();
			$path = $path .'\\'. $node->getFilename();
            $path = str_replace("\\", '/', $path);


            $data[] = array(
                'type' => 'file',
                'name' => $node->getFilename(),
                'path' => $path,
                'files' => false
            );
        }
    }
    return $data;
}

$tree = fillArrayWithFileNodes( new DirectoryIterator( 'mojFolder' ) );
?>
</code></pre>

Każdy pobrany element jest tablicą, która posiada składowe:

* <strong>type</strong> - mówi nam, czy element jest katalogiem, czy plikiem
* <strong>name</strong> - nazwa danego elementu
* <strong>path</strong> - ścieżka do elementu
* <strong>files</strong> - jeżeli elementem jest katalogiem, to tutaj trafi jego pliki (i podkatalogi)


Pozostaje nam wyświetlić naszą tablicę na stronie za pomocą JS. W poniższym kodzie użyłem jQuery.

Aby to zrobić musimy ją przekazać do js - najlepiej w formie <strong>json</strong>, a następnie wykonując po niej rekurencyjną pętlę stworzyć listę UL:

<pre><code class="language-js">
var arrayToUL = function(obj, className, id) {
    var $ul = $('&lt;ul class="'+className+'" '+ ((id!=undefined)?'id="'+id+'"':'') +'>&lt;/ul>');
    jQuery.each(obj, function(i, val) {
            var $li = $('* &lt;/li>');
            if (val.type == 'folder') {
                    var $subUl = arrayToUL(val['files'], 'subfolder');
                    $li.append($('&lt;a class="folder" href="'+val.path+'" class="label">'+val.name+' &lt;span class="count">['+$subUl.children('li').length+']&lt;/span> &lt;/a>'));
                    $li.append($subUl);
            } else {
                    $li.append($('&lt;a class="file" href="'+val.path+'">'+val.name+'&lt;/a>'));
            }
            $ul.append($li);
    });
    return $ul;
};

var json = <?php echo json_encode($tree); ?>;
var $ul = arrayToUL(json, 'folder-tree', 'folderTree');

$(function() {
    $('body').append($ul);
})
</code></pre>

Funkcja <strong>arrayToUL()</strong>. Aby móc stylować powyższą listę tworzymy ją z klasą i id. Następnie wykonujemy zwykłą rekurencyjną pętlę po wszystkich elementach przekazanego json. Rekurencja ta jest bardzo prosta. Jeżeli <strong>element.type</strong> jest plikiem, wtedy do listy $ul dodajemy kolejne LI z danym elementem. Jeżeli jednak jest katalogiem, dla elementu tego wykonujemy jeszcze raz tą samą funkcję podstawiając jej wynik pod <strong>$subUl</strong>. Następnie to <strong>$subUl</strong> wstawiamy jako kolejne LI. Takie czary.

Pozostaje nam ostylowanie naszej listy:

<pre><code class="language-css">
.folder-tree, .folder-tree ul {
    padding:0;
    margin:0;
    list-style:none;
}
.folder-tree li {
    display:block;
    position:relative;
    padding-left:20px;
    padding-right:10px;
}
.folder-tree li:before {
    width:1px;
    height:100%;
    background:#ddd;
    position:absolute;
    left:5px;
    top:0;
    content:'';
}
.folder-tree li .count {
    color:#888;
}
.folder-tree > li:first-child:before {
    top:50%;
    height:50%;
}
.folder-tree li:after {
    width:10px;
    height:1px;
    background:#ddd;
    position:absolute;
    left:5px;
    top:50%;
    content:'';
}
.folder-tree li:last-child:before {
    height:50%;
}
.folder-tree li a {
    font:12px sans-serif;
    text-decoration:none;
    color:#333;
    white-space:nowrap;
    padding-left:25px;
    padding-right:4px;
    line-height:26px;
    min-height:26px;
    display:inline-block;
    border-radius:2px;
    background-position:4px center;
    background-repeat:no-repeat;
    -moz-transition: 0.2s background-color;
    -webkit-transition: 0.2s background-color;
    -ms-transition: 0.2s background-color;
    -o-transition: 0.2s background-color;
    transition: 0.2s background-color;
}
.folder-tree li a:hover {
    background-color:#eee;
}
.folder-tree li a.folder {
    background-image:url(folder.png);
}
.folder-tree li a.file {
    background-image:url(file.png);
}
</code></pre>

Możemy też dodać domyślne zwinięcie podkatalogów, i rozwijanie ich po kliknięciu na nie:

<pre><code class="language-css">
.folder-tree .subfolder {
    display:none;
}
</code></pre>

<pre><code class="language-html">
&lt;script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js">&lt;/script>
&lt;script>
$(function(){
	$('.folder-tree .folder').on('click', function(e) {
        e.preventDefault();
        $(this).next().slideToggle();
    });
})
&lt;/script>
</code></pre>

<a href="http://domanart.pl/dema/drzewo-plikow/index.php" class="demo">Zobacz przykładowe drzewo</a>

Gotowy przykład możesz też pobrać <a href="http://domanart.pl/dema/drzewo-plikow/drzewo-plikow.zip">tutaj</a>